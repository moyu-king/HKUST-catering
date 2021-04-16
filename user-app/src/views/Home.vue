<template>
  <div class="Home">
    <NavBar title="科大餐饮" :border="false">
      <template #left>
        <div class="navBar-left" @click="showPicker = true">
          <van-icon name="location-o" size="16" color="#fff" />
          <span class="location">{{ location }}</span>
        </div>
      </template>
    </NavBar>
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          ><img src="@/assets/img/swiper/swiper1.jpg" alt="" class="swiper-img"
        /></van-swipe-item>
        <van-swipe-item
          ><img src="@/assets/img/swiper/swiper2.png" alt="" class="swiper-img"
        /></van-swipe-item>
        <van-swipe-item
          ><img src="@/assets/img/swiper/swiper3.png" alt="" class="swiper-img"
        /></van-swipe-item>
        <van-swipe-item
          ><img src="@/assets/img/swiper/swiper4.png" alt="" class="swiper-img"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <div class="breakfast content-item">
        <img src="@/assets/img/icon/breakfast.png" alt="" />
        <div class="content-item-text breakfast-text">
          <span class="stage">早餐</span>
          <span class="deadline">8:30&nbsp;截止时间</span>
        </div>
      </div>
      <div class="lunch content-item">
        <img src="@/assets/img/icon/lunch.png" alt="" />
        <div class="content-item-text lunch-text">
          <span class="stage">午餐</span>
          <span class="deadline">12:30&nbsp;截止时间</span>
        </div>
      </div>
      <div class="dinner content-item">
        <img src="@/assets/img/icon/dinner.png" alt="" />
        <div class="content-item-text dinner-text">
          <span class="stage">晚餐</span>
          <span class="deadline">19:00&nbsp;截止时间</span>
        </div>
      </div>
    </div>
    <div class="propaganda">
      <div class="propaganda-tag">{{ propaganda.title }}</div>
      <img :src="propaganda.banner" class="propaganda-banner" />
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :default-index="distanceIndex"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
import banner from "@/assets/img/banner.png";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      showPicker: false,
      distance: 0,
      distanceIndex: 0,
      location: "定位中",
      locations: [
        { name: "第一食堂", lng: 109.447206, lat: 24.339539, distance: 0 },
        { name: "第二食堂", lng: 109.452883, lat: 24.340061, distance: 0 },
        { name: "第三食堂", lng: 109.454649, lat: 24.337818, distance: 0 },
      ],
      propaganda: {
        title: "抗疫行动",
        banner: banner,
      },
    };
  },
  computed: {
    columns() {
      let array = [];
      let text = "";
      for (const item of this.locations) {
        text = `${item.name} ${this.formatDistant(item.distance)}`;
        array.push(text);
      }
      return array;
    },
  },
  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      //利用百度地图获取当前经纬度
      const _this = this;
      try {
        const geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            const { lat, lng } = r.point;
            let distances = [];
            for (let item of _this.locations) {
              let distance = _this.getSpace(lat, lng, item.lat, item.lng);
              distances.push(distance);
              item.distance = distance;
            }
            _this.distanceIndex = distances.indexOf(
              Math.min.apply(null, distances)
            );
            _this.location = _this.locations[_this.distanceIndex].name;
          }
        });
      } catch (e) {
        _this.location = "定位失败";
        console.error(e);
      }
    },
    onConfirm(value, index) {
      this.showPicker = false;
      this.location = this.locations[index].name;
    },

    getSpace(lat1, lng1, lat2, lng2) {
      //lat 纬度、lng 经度
      var radLat1 = (lat1 * Math.PI) / 180.0;
      var radLat2 = (lat2 * Math.PI) / 180.0;
      var a = radLat1 - radLat2;
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000; // 单位千米
      return s;
    },
    formatDistant(value) {
      if (value > 10) return ">10km";
      else if (value < 1) return `${value * 1000}m`;
      else return `${value}km`;
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: myFont;
  src: url(~@/assets/font/myFont.ttf);
}
@mixin center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

$transparentBg: rgba(255, 255, 255, 0);
$navBarH: 50px;

.Home {
  .NavBar {
    width: 100%;
    background-color: $transparentBg;

    .van-nav-bar {
      background-color: $transparentBg;
    }
    .van-nav-bar__title {
      color: #fff;
    }
    .navBar-left {
      display: flex;
      align-items: center;

      .location,
      .distance {
        margin-left: 4px;
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .swiper {
    margin-top: -$navBarH;
    width: 100%;
    height: 80vw;
    @include center-flex();
    background: rgb(249, 179, 129);

    .my-swipe {
      width: 90%;
      height: 55%;
      border-radius: 10px;

      .van-swipe-item > .swiper-img {
        height: 100%;
        width: 100%;
      }
    }
  }

  .content {
    margin: -5vh auto 5vh;
    width: 90vw;
    height: 120vw;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 12px #ebedf0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .content-item {
      width: 90%;
      height: 25%;
      border-radius: inherit;
      display: flex;
      align-items: center;

      & > img {
        margin-left: 10vw;
        width: 16vw;
        height: 16vw;
      }

      &-text {
        margin-left: 5vw;
        display: flex;
        flex-direction: column;
        font: {
          size: 20px;
          family: myFont;
        }
        .deadline {
          margin-top: 8px;
          font-size: 14px;
        }
      }

      .breakfast-text {
        color: #1296db;
      }
      .lunch-text {
        color: #ec6646;
      }
      .dinner-text {
        color: #f9ca24;
      }
    }
    //#EC6646
    .breakfast,
    .dinner {
      background: {
        image: url(~@/assets/img/background/breakfast.png);
        size: cover;
      }
    }

    .lunch {
      background: {
        image: url(~@/assets/img/background/lunch.png);
        size: cover;
      }
    }

    &:before,
    &:after {
      content: "";
    }
  }

  .propaganda {
    width: 100%;
    height: 95vw;
    position: relative;
    @include center-flex();

    &-tag {
      padding: 10px 15px;
      position: absolute;
      top: 20px;
      left: 0;
      color: white;
      border-radius: 5px;
      background-color: rgb(255, 0, 0);
    }

    &-banner {
      width: 81%;
      height: 48vw;
    }
  }
}
</style>
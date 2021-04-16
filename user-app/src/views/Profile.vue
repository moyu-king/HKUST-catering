<template>
  <div class="Profile">
    <NavBar title="我的" :border="false">
      <template #left><i></i></template>
    </NavBar>
    <div class="floor">
      <van-image
        round
        fit="cover"
        width="18vw"
        height="18vw"
        :src="user.avatar"
      />
      <!-- TODO loign verfication -->
      <span v-if="false">点我登录</span>
      <div class="info" v-else>
        <span class="username">{{ user.username }}</span>
        <span class="studentId">{{ user.studentId }}</span>
      </div>
    </div>
    <div class="account">
      <div class="wallet item">
        <span class="number">0&nbsp;<font>元</font></span>
        <span>我的余额</span>
      </div>
      <div class="discount item">
        <span class="number">0&nbsp;<font>张</font></span>
        <span>我的优惠券</span>
      </div>
      <div class="order item">
        <span class="number">0</span>
        <span>本月订单</span>
      </div>
    </div>
    <div class="tool">
      <div class="tool-title">常用工具</div>
      <ul class="tool-content">
        <li class="tool-content-item">
          <img src="@/assets/img/icon/wallet.png" alt="" />
          <span>充值中心</span>
        </li>
        <li class="tool-content-item">
          <img src="@/assets/img/icon/address.png" alt="" />
          <span>收货地址</span>
        </li>
        <li class="tool-content-item">
          <img src="@/assets/img/icon/about.png" alt="" />
          <span>关于鲜适</span>
        </li>
        <li class="tool-content-item">
          <img src="@/assets/img/icon/service.png" alt="" />
          <span>我的客服</span>
        </li>
        <li class="tool-content-item">
          <img src="@/assets/img/icon/invoice.png" alt="" />
          <span>发票汇总</span>
        </li>
        <li class="tool-content-item">
          <img src="@/assets/img/icon/group.png" alt="" />
          <span>我的拼团</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
export default {
  name: "Profile",
  components: {
    NavBar,
  },
  data() {
    return {
      user: {
        username: "伞兵一号",
        studentId: "201709601222",
        avatar:"https://img01.yzcdn.cn/vant/cat.jpeg"
      },
    };
  },
};
</script>

<style lang="scss">
$transparentBg: rgba(255, 255, 255, 0);
$navBarH: 50px;

.Profile {
  .NavBar {
    width: 100%;
    background-color: $transparentBg;

    .van-nav-bar {
      background-color: $transparentBg;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .floor {
    margin-top: -$navBarH;
    width: 100%;
    height: 60vw;
    display: flex;
    align-items: center;
    background: linear-gradient(
      135deg,
      #ef0d00,
      #f74321,
      #f94e29,
      #fc5f35,
      #ff6348
    );

    .van-image {
      margin-left: 5vw;
    }

    & > span {
      color: white;
      margin-left: 5vw;
    }
    & > .info {
      margin-left: 5vw;
      display: flex;
      flex-direction: column;
      color: #fff;

      .username {
        margin-bottom: 8px;
      }
    }
  }

  .account {
    margin: -15vw auto 5vw;
    width: 90%;
    height: 30vw;
    border-radius: 12px;
    box-shadow: 0 3px 3px #dcdde1;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > .item {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #606266;
      font-size: 14px;

      .number {
        margin-bottom: 4vw;
        font: {
          weight: 700;
          size: 24px;
        }
        & > font {
          font-size: 12px;
        }
      }
    }
  }

  .tool {
    padding: 0 5vw;
    margin-top: 40px;
    width: 100%;

    &:after {
      content: "";
      display: block;
      clear: both;
      visibility: hidden;
    }

    &-title {
      font: {
        size: 22px;
        weight: 700;
      }
    }

    &-content {
      margin-top: 20px;
      &-item {
        float: left;
        width: 22.5vw;
        height: 22.5vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;

        & > img {
          width: 28px;
          height: 28px;
          margin-bottom: 3vw;
        }
      }
    }
  }
}
</style>
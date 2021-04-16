<template>
  <div class="About">
    <NavBar title="关于科大餐饮" :border="false">
      <template #left><i></i></template>
    </NavBar>
    <div class="content">
      <img src="@/assets/img/about/introduce.jpg" />
      <img src="@/assets/img/about/about1.jpg" />
      <img src="@/assets/img/about/about2.jpg" />
      <img src="@/assets/img/about/about3.jpg" />
      <img src="@/assets/img/about/about4.jpg" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
export default {
  name: "About",
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
$transparentBg: rgba(255, 255, 255, 0);
$navBarH: 50px;

.About {
  .NavBar {
    width: 100%;
    background-color: rgba(255, 255, 255, 0);

    .van-nav-bar {
      background-color: rgba(255, 255, 255, 0);
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .content {
    margin-top: -50px;
    & > img {
      width: 100%;
    }
  }
}
</style>
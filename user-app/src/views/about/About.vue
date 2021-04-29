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
  inject: ["tabBar"],
  mounted() {
    const { tabBar } = this;
    tabBar.show = true;
  },
  destroyed() {
    const { tabBar } = this;
    tabBar.show = false;
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
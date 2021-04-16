<template>
  <div id="app">
    <div id="conetent" class="outer-container">
      <keep-alive include="Home">
        <router-view></router-view>
      </keep-alive>
    </div>
    <div id="tabBar">
      <TabBar></TabBar>
    </div>
  </div>
</template>
<script>
import TabBar from "@/components/nav/TabBar";
export default {
  name: "App",
  components: {
    TabBar,
  },
};
</script>
<style lang="scss">
@import "./assets/css/normalize.css";
</style>

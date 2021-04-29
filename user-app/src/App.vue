<template>
  <div id="app">
    <div id="content" class="outer-container">
      <router-view></router-view>
    </div>
    <div id="tabBar" v-if="tabBar.show">
      <TabBar></TabBar>
    </div>
  </div>
</template>
<script>
import TabBar from "@/components/nav/TabBar";
export default {
  name: "App",
  provide() {
    return {
      tabBar: this.tabBar,
    };
  },
  components: {
    TabBar,
  },
  data() {
    return {
      tabBar: {
        show: false,
      },
    };
  },
};
</script>
<style lang="scss">
@import "./assets/css/base.css";
</style>

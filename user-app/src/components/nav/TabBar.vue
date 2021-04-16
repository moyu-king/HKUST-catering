<template>
  <div class="TabBar">
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      :z-index="9999"
    >
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="info-o" to="/about">关于</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      active: 0,
    };
  },
  watch: {
    $route(to, from) {
      this.initActive(to.path);
    },
  },
  methods: {
    initActive(path) {
      switch (path) {
        case "/home":
          this.active = 0;
          break;
        case "/about":
          this.active = 1;
          break;
        case "/profile":
          this.active = 2;
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
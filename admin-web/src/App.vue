<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      admin: this.admin,
    };
  },
  data() {
    return {
      admin: {
        avatar: "",
        username: "",
        phone: "",
        alias: "",
        address: "",
        shop_name: "",
      },
    };
  },
};
</script>

<style lang="scss">
@import "./assets/css/normalize.css";
@import "./assets/css/base.css";
</style>

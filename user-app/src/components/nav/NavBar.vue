<template>
  <div class="NavBar">
    <van-nav-bar :title="title" :border="border">
      <template #left>
        <slot name="left">
          <div class="navBar-left" @click="goBack" v-if="back">
            <van-icon name="arrow-left" />
            <span>返回</span>
          </div>
        </slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: true,
    },
    back: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.navBar-left {
  display: flex;
  align-items: center;
  justify-content: center;
  .van-icon {
    color: black;
  }
}

i {
  padding-right: 5px;
}
</style>
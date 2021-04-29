<template>
  <div class="NavBar">
    <van-nav-bar :title="title" :border="border">
      <template #left>
        <slot name="left"></slot>
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
  },
};
</script>

<style lang="scss">
</style>
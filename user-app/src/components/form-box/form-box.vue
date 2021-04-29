<template>
  <section class="form-box">
    <div class="form-box-title" v-if="title">{{ title }}</div>
    <form :action="action">
      <slot></slot>
    </form>
  </section>
</template>

<script>
export default {
  name: "FormBox",
  props: {
    action: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.form-box {
  display: flex;
  flex-direction: column;

  &-title {
    width: 100%;
    margin-bottom: 20px;
    font: {
      size: 28px;
      weight: 700;
      family: "黑体";
    }
  }
}
</style>
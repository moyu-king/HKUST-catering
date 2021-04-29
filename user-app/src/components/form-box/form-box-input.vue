<template>
  <div class="form-box-input" :class="{ focus: isFocus }">
    <van-icon :name="icon" v-if="icon" />
    <input
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocompleteTransform"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script>
export default {
  name: "form-box-input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isFocus: false,
      inputValue: this.value,
    };
  },
  computed: {
    autocompleteTransform() {
      return this.autocomplete ? "on" : "off";
    },
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    },
    handleFocus() {
      this.isFocus = true;
    },
    handleBlur() {
      this.isFocus = false;
    },
  },
};
</script>

<style lang="scss">
.form-box-input {
  $text-color: #a4b0be;
  $theme-color: #fe4e36;

  width: 100%;
  height: 50px;
  position: relative;
  margin-bottom: 30px;

  .van-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: $text-color;
  }

  input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid $text-color;
    font-size: 16px;
    text-indent: 2.2rem;
  }

  &.focus .van-icon {
    color: $theme-color;
  }

  &.focus input {
    border-bottom: 1px solid $theme-color;
    color: $theme-color;

    &::-webkit-input-placeholder {
      color: $theme-color;
    }

    &::-moz-placeholder {
      color: $theme-color;
    }
  }
}
</style>
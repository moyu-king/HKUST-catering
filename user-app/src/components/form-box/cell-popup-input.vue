<template>
  <div class="cell-popup-iput">
    <van-cell
      :class="{ modify: isModify }"
      :clickable="clickable"
      :is-link="isLink"
      :title="title"
      :value="value"
      @click="showPopup"
    />
    <!-- 弹出层 -->
    <van-popup
      v-model="popupShow"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      @close="handleClose"
    >
      <van-form @submit="onSubmit">
        <van-field
          ref="field"
          v-model="fieldValue"
          autofocus
          size="large"
          label-width="3rem"
          :placeholder="placeholder"
          :label="title"
          :rules="rules"
        />
        <van-button round type="primary" native-type="submit">确定</van-button>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "CellPopupInput",
  props: {
    clickable: {
      type: Boolean,
      default: true,
    },
    isLink: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      popupShow: false,
      isModify: false,
      fieldValue: "",
      cellValue: "",
    };
  },
  computed: {
    placeholder() {
      return `请输入${this.title}`;
    },
  },
  methods: {
    showPopup() {
      this.popupShow = true;
    },
    handleClose() {
      this.$refs.field.resetValidation();
      this.fieldValue = "";
    },
    switchStatus() {
      this.isModify = !this.isModify;
    },
    onSubmit() {
      if (this.value !== this.fieldValue) {
        this.$emit("input", this.fieldValue);
        this.switchStatus();
      }
      this.fieldValue = "";
      this.popupShow = false;
    },
  },
};
</script>

<style lang="scss">
.cell-popup-iput {
  .van-cell.modify .van-cell__value {
    color: #fe4e36;
  }
  .van-popup {
    background: #f7f8fa;
  }
  .van-field {
    margin-top: 50px;
    input {
      font-size: 1rem;
    }
  }

  .van-from .van-button {
    display: block;
    width: 80%;
    margin: 0 auto 0;
  }
}
</style>
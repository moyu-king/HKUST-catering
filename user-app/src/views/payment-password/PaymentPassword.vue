<template>
  <div class="payment-password">
    <NavBar title="支付密码" :back="true"> </NavBar>
    <div class="payment-password-content">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ tip }}</p>
      <van-password-input
        :value="payment_password"
        :focused="showKeyboard.origin"
        gutter="10px"
        @focus="showKeyboard.origin = true"
      />
      <van-button
        v-if="paymentPassExist"
        type="primary"
        @click="validatePass"
        :disabled="originButtonDisabled"
      >
        验证
      </van-button>
      <van-button
        v-else
        type="primary"
        @click="settingPaymentPass"
        :disabled="originButtonDisabled"
      >
        设置
      </van-button>
      <!-- 数字键盘origin -->
      <van-number-keyboard
        v-model="payment_password"
        :show="showKeyboard.origin"
        @blur="showKeyboard.origin = false"
      />
    </div>
    <!-- 弹出层 -->
    <van-popup
      class="update-popup"
      v-model="showPopup"
      position="right"
      :style="{ height: '100vh', width: '100vw' }"
      closeable
      :overlay="false"
      @open="hanldePopupOpen"
      @close="hanldePopupClose"
    >
      <div class="payment-password-content popup">
        <h3 class="title">设置密码</h3>
        <p class="description">请输入你想要修改的密码</p>
        <van-password-input
          :value="newPaymentPass"
          :focused="showKeyboard.popup"
          gutter="10px"
          @focus="showKeyboard.popup = true"
        />
        <van-button
          type="primary"
          @click="updatePass"
          :disabled="popupButtonDisabled"
        >
          修改
        </van-button>
      </div>
      <!-- 数字键盘popup -->
      <van-number-keyboard
        v-model="newPaymentPass"
        :show="showKeyboard.popup"
        @blur="showKeyboard.popup = false"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
import {
  isPaymentPassExist,
  validatePaymentPass,
  updatePaymentPass,
} from "@/service/user";
export default {
  name: "PaymentPassword",
  components: {
    NavBar,
  },
  data() {
    return {
      paymentPassExist: false,
      payment_password: "",
      newPaymentPass: "",
      showKeyboard: {
        origin: true,
        popup: false,
      },
      showPopup: false,
    };
  },
  computed: {
    title() {
      return this.paymentPassExist ? "修改密码" : "设置密码";
    },
    tip() {
      return this.paymentPassExist
        ? "请输入支付密码，以验证身份"
        : "检测到你还未设置支付密码";
    },
    originButtonDisabled() {
      return this.payment_password.length === 6 ? false : true;
    },
    popupButtonDisabled() {
      return this.newPaymentPass.length === 6 ? false : true;
    },
  },
  watch: {
    payment_password(newValue, oldValue) {
      if (newValue.length > 6) {
        this.payment_password = oldValue;
      }
    },
    newPaymentPass(newValue, oldValue) {
      if (newValue.length > 6) {
        this.newPaymentPass = oldValue;
      }
    },
  },
  async created() {
    this.paymentPassExist = (await isPaymentPassExist()).data.isExist;
  },
  methods: {
    hanldePopupOpen() {
      this.showKeyboard.popup = true;
      this.payment_password = "";
    },
    hanldePopupClose() {
      this.newPaymentPass = "";
      this.showKeyboard.origin = true;
    },
    async validatePass() {
      const res = await validatePaymentPass({
        payment_password: this.payment_password,
      });
      if (res.status) {
        this.showPopup = true;
      }
    },
    async updatePass() {
      const res = await updatePaymentPass({
        payment_password: this.newPaymentPass,
      });

      if (res.status) {
        this.$toast.success("修改修改成功");
        this.$router.back();
      }
    },
    async settingPaymentPass() {
      const res = await updatePaymentPass({
        payment_password: this.payment_password,
      });

      if (res.status) {
        this.$toast.success("设置成功");
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
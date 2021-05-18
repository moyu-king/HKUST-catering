<template>
  <div class="payment">
    <NavBar title="科大餐饮" :border="false" :back="true"></NavBar>
    <van-cell-group title="配送地址">
      <van-cell class="payment-user">
        <div class="payment-user-info">
          <div class="payment-user-info-top">
            <div class="name">
              <van-icon name="manager" size="18px" class="payment-user-icon" />
              {{ user.username }}
            </div>
            <div class="phone">
              <van-icon name="phone" size="18px" class="payment-user-icon" />
              <span :style="{ color: unprocessedColor(user.phone) }">
                {{ user.phone | none }}
              </span>
            </div>
          </div>
          <div class="payment-user-info-bottom">
            <div class="address">
              <img
                src="@/assets/img/icon/address.png"
                class="payment-user-icon img"
              />
              <span
                class="address-text"
                :style="{ color: unprocessedColor(user.address) }"
              >
                {{ user.address | none }}
              </span>
            </div>
          </div>
        </div>
        <router-link to="/user-info" class="payment-user-modify">
          <van-icon name="edit" size="20px" />
          <span style="font-size: 14px">修改</span>
        </router-link>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="就餐方式">
      <van-cell
        is-link
        :title="orderType | orderTypeFilter"
        :value="orderTypePrice | orderTypePriceFilter"
        @click="diningStylePopup = true"
        :style="{ color: unprocessedColor(orderType) }"
      />
      <van-action-sheet
        v-model="diningStylePopup"
        :actions="orderTypeActions"
        @select="onSelect"
      />
    </van-cell-group>
    <van-cell-group title="已选项">
      <van-swipe-cell
        v-for="(item, index) in $store.state.selectedFoods"
        :key="index"
      >
        <van-card
          class="payment-card"
          :num="item.step"
          :price="(item.price * item.step).toFixed(2)"
          :title="item.food_name"
          :thumb="item.image"
          :desc="item.description"
        >
          <template #title>
            <div class="van-card-title">
              {{ item.food_name }}
            </div>
          </template>
          <template #tags>
            <van-tag plain type="danger">{{ item.type }}</van-tag>
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="payment-card-delete"
            @click="deleteSelectedFood(index)"
          />
        </template>
      </van-swipe-cell>
    </van-cell-group>
    <van-cell-group title="优惠券">
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px"
      >
        <van-coupon-list
          :show-exchange-bar="false"
          :chosen-coupon="chosenCoupon"
          :coupons="coupons"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
        />
      </van-popup>
    </van-cell-group>
    <van-submit-bar
      :price="total"
      button-text="付款"
      tip-icon="info-o"
      :disabled="isDisabled"
      :tip="completionTip"
      @submit="showPaymentPopup"
    />
    <!-- 支付弹出层 -->
    <van-popup
      class="popup-payment"
      v-model="paymentPopup"
      round
      closeable
      @close="paymentPassword = ''"
    >
      <h3>餐饮支付</h3>
      <van-password-input
        :value="paymentPassword"
        :focused="showKeyboard"
        gutter="10px"
        @focus="showKeyboard = true"
      />
      <div class="payment-way">
        <div>支付方式</div>
        <div class="payment-way-selection" @click="tip">
          <van-icon name="arrow-down" size="14px" />
          <img src="@/assets/img/icon/wallet.png" class="payment-way-icon" />
          钱包
        </div>
      </div>
      <div class="payment-button">
        <van-button
          type="primary"
          round
          @click="payment"
          :disabled="paymentButtonDisable"
          >支付</van-button
        >
      </div>
    </van-popup>
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="paymentPassword"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
import { getStudentCoupons } from "@/service/coupon";
import {
  getUserInfo,
  isPaymentPassExist,
  validatePaymentPass,
  updateWallet,
} from "@/service/user";
import { getOrderTypes } from "@/service/order";
import { orderSocket } from "@/service/socket";

export default {
  name: "Payment",
  components: {
    NavBar,
  },
  filters: {
    none(value) {
      return value === "" ? "暂无填写" : value;
    },
    orderTypeFilter(value) {
      return value === "" ? "请选择" : value;
    },
    orderTypePriceFilter(value) {
      return value === "" ? "" : `￥${value.toFixed(2)}`;
    },
  },
  data() {
    return {
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      useCouponId: "",
      discount: 0,
      showList: false,
      paymentPopup: false,
      showKeyboard: false,
      paymentPassword: "",
      user: "",
      diningStylePopup: false,
      orderType: "",
      orderTypePrice: "",
      orderTypeActions: [],
      isDisabled: true,
    };
  },
  computed: {
    total() {
      //vant格式处理,需要多加两个0,且还必须是Number类型,所以结果*100
      let foodsPrice = this.$store.getters.totalPrice * 100;
      if (this.chosenCoupon !== -1) {
        foodsPrice -= this.coupons[this.chosenCoupon].value;
      }

      if (this.orderTypePrice !== "") {
        foodsPrice += this.orderTypePrice * 100;
      }

      return foodsPrice < 0 ? 1 : foodsPrice;
    },
    completionTip() {
      const { address, phone } = this.user;
      const orderType = this.orderType;
      if (!address || !phone || !orderType) {
        this.isDisabled = true;
        return "存在未完成的必填项，请认真确认好";
      } else {
        this.isDisabled = false;
        return "";
      }
    },
    paymentButtonDisable() {
      return this.paymentPassword.length === 6 ? false : true;
    },
  },
  watch: {
    paymentPassword(newValue, oldValue) {
      if (newValue.length > 6) {
        this.paymentPassword = oldValue;
      }
    },
  },
  async mounted() {
    this.user = (await getUserInfo()).data;
    this.orderTypeActions = (await getOrderTypes()).data;
    this.orderTypeActions.forEach((item) => {
      this.$set(item, "name", this.transformValue(item.value));
    });

    let res = (await getStudentCoupons()).data;
    res = res.filter((item) => item.status); //筛选没用过的coupon
    res.forEach((item) => {
      //将格式装换成vant-coupon的格式
      const obj = {
        coupon_id: item.coupon_id,
        condition: `门槛：${item.use_limit}元`,
        name: item.title,
        startAt: Math.round(item.create_time / 1000), //vant使用的是10位时间戳，以下转换方案不够准确，凑合着用
        endAt: Math.round(item.expireIn / 1000),
        valueDesc: item.discount,
        unitDesc: "元",
        value: item.discount * 100,
      };

      if (item.use_limit > this.$store.getters.totalPrice) {
        this.disabledCoupons.push(obj);
      } else {
        this.coupons.push(obj);
      }
    });
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      if (index !== -1) {
        this.useCouponId = this.coupons[index].coupon_id;
        this.discount = this.coupons[index].value / 100;
      } else {
        this.discount = 0;
      }
    },
    deleteSelectedFood(index) {
      if (this.$store.state.selectedFoods.length === 1) {
        this.$toast.fail("至少得有一件商品！");
        return;
      }
      this.$store.commit("deleteSelectedFoodByIndex", index);
    },
    async showPaymentPopup() {
      const res = (await isPaymentPassExist()).data.isExist;
      if (res) {
        this.paymentPopup = true;
        this.showKeyboard = true;
      } else {
        this.$dialog
          .confirm({
            title: "警告",
            message: "检测到您的账户尚未设置支付密码，是否现在前往设置？",
          })
          .then(() => {
            this.$router.push("/payment-password");
          })
          .catch(() => {});
      }
    },
    async payment() {
      const res = await validatePaymentPass({
        payment_password: this.paymentPassword,
      });
      //支付密码验证成功，开始扣余额
      if (res.status) {
        const updateWalletRes = await updateWallet({
          price: -(this.total / 100),
        });
        //支付成功，开始建立websocket通讯
        if (updateWalletRes.status) {
          const foods = [];
          this.$store.state.selectedFoods.forEach((item) => {
            foods.push({
              food_id: item.food_id,
              number: item.step,
            });
          });

          orderSocket({
            username: this.user.studentId,
            price: this.total / 100,
            order_type: this.transformValue(this.orderType),
            coupon_id: this.useCouponId,
            discount: this.discount,
            foods,
          });

          this.paymentPopup = false;
        }
      }
    },
    tip() {
      this.$toast({
        message: "抱歉，目前只支持一种支付方式",
      });
    },
    onSelect(item) {
      this.orderType = item.name;
      this.orderTypePrice = item.price;
      this.diningStylePopup = false;
    },
    unprocessedColor(item) {
      return item === "" ? "#f01626" : "#000";
    },
    transformValue(value) {
      if (typeof value === "number") {
        switch (value) {
          case 0:
            return "堂食";
          case 1:
            return "打包";
          case 2:
            return "外卖";
        }
      } else if (typeof value === "string") {
        switch (value) {
          case "堂食":
            return 0;
          case "打包":
            return 1;
          case "外卖":
            return 2;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
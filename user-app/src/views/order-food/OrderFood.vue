<template>
  <div class="order-food">
    <NavBar title="餐饮预订" :back="true"></NavBar>
    <div class="order-food-header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="order-food-date"
        :class="{ active: currentTab === tab }"
        @click="currentTab = tab"
      >
        <div class="order-food-date__week">{{ tab | week }}</div>
        <div class="order-food-date__time">{{ tab | date }}</div>
      </div>
    </div>
    <div class="order-food-container">
      <div
        class="order-food-item"
        v-for="(food, index) in currentFoods"
        :key="index"
      >
        <div class="order-food-item__floor">
          <div
            class="order-food-item-introduction"
            :style="{ background: getFoodBg(food.type) }"
          >
            <van-image width="120" height="120" :src="food.image" />
            <div class="order-food-item-name">{{ food.food_name }}</div>
          </div>
          <div class="order-food-item-footer">
            <div class="order-food-item-price">{{ food.price | price }}</div>
            <van-stepper
              v-model="food.step"
              theme="round"
              button-size="16"
              disable-input
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- toolBar -->
    <div class="tag">
      <van-tag color="#faece5" size="medium" text-color="#636e72">荤</van-tag>
      <van-tag color="#eafde8" size="medium" text-color="#636e72">素</van-tag>
    </div>
    <div class="shopCart">
      <div class="totle-price">
        <van-badge :content="$store.getters.totalNumber">
          <van-icon name="shopping-cart" />
        </van-badge>
        <span class="price-text">{{ $store.getters.totalPrice | price }}</span>
      </div>
      <div class="payment-button" @click="payment">去结算</div>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="orderShow"
      round
      closeable
      position="bottom"
      :style="{ height: '80%' }"
    >
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
import { getFoods } from "@/service/food";
import { weekFormat, dateWithoutYear } from "@/utils/format";

export default {
  name: "OrderFood",
  components: {
    NavBar,
  },
  filters: {
    week(value) {
      return weekFormat(value);
    },
    date(value) {
      return dateWithoutYear(value);
    },
    price(value) {
      return `￥${value.toFixed(2)}`;
    },
  },
  data() {
    return {
      foods: [],
      currentTab: "",
      orderShow: false,
    };
  },
  async mounted() {
    this.foods = (await getFoods()).data;
    this.foods.forEach((food) => {
      this.$set(food, "step", 0);
    });
  },
  computed: {
    tabs() {
      const dates = [...new Set(this.foods.map((food) => food.date))];
      dates.sort(
        (pre, next) => new Date(pre).getTime() - new Date(next).getTime()
      );
      return dates;
    },
    currentFoods() {
      const foods = [];

      this.foods.forEach((food) => {
        if (food.date === this.currentTab) {
          foods.push(food);
        }
      });
      return foods;
    },
  },
  watch: {
    tabs(value) {
      this.currentTab = value[0];
    },
    currentFoods: {
      handler(value) {
        const selection = this.currentFoods.filter((food) => food.step !== 0);
        this.$store.commit("changeSelectedFoods", selection);
      },
      deep: true,
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getFoodBg(type) {
      switch (type) {
        case "荤":
          return "#faece5";
        case "素":
          return "#eafde8";
      }
    },
    payment() {
      if (!localStorage.getItem("token")) {
        this.$toast("您还未登录");
      } else if (!this.$store.getters.totalNumber) {
        this.$toast("购物车空空如也~");
      } else {
        this.$router.push("/payment");
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
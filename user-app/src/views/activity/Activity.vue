<template>
  <div class="activity">
    <NavBar title="近期活动" :back="true"></NavBar>
    <div class="activity-content" v-if="coupons.length">
      <van-cell-group title="优惠券">
        <div class="activity-coupon" v-for="coupon in coupons" :key="coupon.id">
          <div class="activity-coupon-info">
            <div class="money">
              <div class="discount">
                <span> {{ coupon.discount | priceFormat }} </span>元
              </div>
              <div class="useLimit">
                门槛：{{ coupon.use_limit | priceFormat }}元
              </div>
            </div>
            <div class="description">
              <div class="title">{{ coupon.title }}</div>
              <div class="expire">
                {{ coupon.create_time | timeFormat }}-
                {{ coupon.expireIn | timeFormat }}
              </div>
            </div>
          </div>
          <van-button
            class="activity-coupon-button"
            type="danger"
            size="small"
            round
            :disabled="coupon.userHold"
            @click="receive(coupon.coupon_id)"
          >
            {{ buttonName(coupon.userHold) }}
          </van-button>
        </div>
      </van-cell-group>
    </div>
    <van-empty description="近期没有活动哦~" v-else></van-empty>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";
import {
  getIssueCoupons,
  getStudentCoupons,
  addStudentCoupon,
} from "@/service/coupon";
export default {
  name: "Activity",
  components: {
    NavBar,
  },
  filters: {
    timeFormat(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      return `${year}-${month}-${day}`;
    },
    priceFormat(value) {
      return value.toFixed(2);
    },
  },
  data() {
    return {
      coupons: [],
    };
  },
  async mounted() {
    this.coupons = (await getIssueCoupons()).data;

    //添加用户持有状态
    if (localStorage.getItem("token") && this.coupons.length !== 0) {
      const studentCoupons = (await getStudentCoupons()).data;
      this.coupons.forEach((coupon) => {
        if (
          studentCoupons.find(
            (studentCoupon) => studentCoupon.coupon_id === coupon.coupon_id
          )
        ) {
          this.$set(coupon, "userHold", true);
        } else {
          this.$set(coupon, "userHold", false);
        }
      });
    } else {
      this.coupons.forEach((coupon) => {
        this.$set(coupon, "userHold", false);
      });
    }
  },
  methods: {
    async receive(coupon_id) {
      const res = await addStudentCoupon({ coupon_id });
      if (res) {
        this.$toast.success("优惠券领取成功");
      }
    },
    buttonName(userHold) {
      return userHold ? "已领取" : "领取";
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
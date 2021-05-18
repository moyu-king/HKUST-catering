<template>
  <div class="Profile">
    <NavBar title="我的" :border="false"></NavBar>
    <div class="floor">
      <van-image
        round
        fit="cover"
        width="18vw"
        height="18vw"
        :src="user.avatar"
      />
      <router-link to="/login" v-if="!token">点我登录</router-link>
      <div class="info" v-else>
        <span class="username">{{ user.username }}</span>
        <span class="studentId">{{ user.studentId }}</span>
      </div>
    </div>
    <div class="account">
      <div class="wallet item">
        <span class="number">{{ wallet }}&nbsp;<font>元</font></span>
        <span>我的余额</span>
      </div>
      <div class="discount item">
        <span class="number">{{ user.couponsCount }}&nbsp;<font>张</font></span>
        <span>我的优惠券</span>
      </div>
      <div class="order item" >
        <span class="number">{{ user.order }}</span>
        <span>本月订单</span>
      </div>
    </div>
    <div class="tool">
      <div class="tool-title">常用工具</div>
      <ul class="tool-content">
        <li class="tool-content-item">
          <img src="@/assets/img/icon/wallet.png" alt="" />
          <span>充值中心</span>
        </li>
        <li class="tool-content-item">
          <img src="@/assets/img/icon/address.png" alt="" />
          <span>收货地址</span>
        </li>
        <li class="tool-content-item" @click="jump('/activity')">
          <img src="@/assets/img/icon/about.png" alt="" />
          <span>近期活动</span>
        </li>
        <li class="tool-content-item">
          <img src="@/assets/img/icon/service.png" alt="" />
          <span>我的客服</span>
        </li>
        <li class="tool-content-item" @click="jump('/order')">
          <img src="@/assets/img/icon/invoice.png" alt="" />
          <span>发票汇总</span>
        </li>
        <li class="tool-content-item" @click="jump('/setting')">
          <img src="@/assets/img/icon/setting.png" alt="" />
          <span>设置</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
import { getUserInfo } from "@/service/user";
export default {
  name: "Profile",
  inject: ["tabBar"],
  components: {
    NavBar,
  },
  data() {
    return {
      user: {
        username: "",
        studentId: "",
        avatar: "",
        wallet: 0,
        couponsCount: 0,
        order: 0,
      },
    };
  },
  computed: {
    token() {
      return localStorage.getItem("token");
    },
    wallet() {
      return this.user?.wallet ? this.user.wallet : 0;
    },
  },
  async mounted() {
    const { tabBar } = this;
    tabBar.show = true;
    if (localStorage.getItem("token")) {
      this.user = (await getUserInfo()).data;
    }
  },
  destroyed() {
    const { tabBar } = this;
    tabBar.show = false;
  },
  methods: {
    jump(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
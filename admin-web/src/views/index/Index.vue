<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <div class="logo-icon"></div>
        <div class="logo-title">科大餐饮后台系统</div>
      </div>
      <div class="menu">
        <el-badge :is-dot="true">
          <i class="el-icon-message"></i>
        </el-badge>
        <el-badge :is-dot="true">
          <i class="el-icon-bell"></i>
        </el-badge>
        <el-dropdown trigger="click">
          <el-avatar :src="admin.avatar" :size="45"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="username">EvanZhao</span>
      </div>
    </div>
    <el-container>
      <div class="aside">
        <el-menu
          :default-active="menu_active"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="order">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order/deal">
              <el-badge v-if="orders.length" :value="orders.length" :max="99"
                >实时订单处理</el-badge
              >
              <span v-else>实时订单处理</span>
            </el-menu-item>
            <el-menu-item index="/order/search">
              <span>查看订单</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="data">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>流量统计</span>
            </template>
            <el-menu-item index="/data/account">账户流水</el-menu-item>
            <el-menu-item index="/data/user">用户流量</el-menu-item>
          </el-submenu>
          <el-menu-item index="/discount">
            <i class="el-icon-s-ticket"></i>
            <span>发行优惠券</span>
          </el-menu-item>
          <el-submenu index="food">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>菜单管理</span>
            </template>
            <el-menu-item index="/food/add">
              <span>添加新菜式</span>
            </el-menu-item>
            <el-menu-item index="/food/put">
              <span>上架菜单</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="shop">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>店铺&账号</span>
            </template>
            <el-menu-item index="/shop/info">修改信息</el-menu-item>
            <el-menu-item index="/shop/pass">修改密码</el-menu-item>
            <el-menu-item index="/shop/avatar">修改头像</el-menu-item>
          </el-submenu>
          <el-menu-item @click="warningMsg">
            <template>
              <i class="el-icon-message"></i>
              <el-badge :value="0" :max="99" hidden>消息留言</el-badge>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main">
        <router-view :orders="orders"></router-view>
      </div>
      <div class="footer">
        Copyright&nbsp;&copy;&nbsp;2020-2021&nbsp;EvanZhao
      </div>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
import { getAdminInfo } from "@/service/admin-info";
import { getOutstandingOrders } from "@/service/order";
import { orderSocket } from "@/service/socket";
export default {
  name: "Index",
  inject: ["admin"],
  data() {
    return {
      socket: null,
      orders: [],
      menu_active: this.$route.path,
    };
  },
  async mounted() {
    //商家信息
    const { admin } = this;
    const res = await getAdminInfo();
    admin.username = res.data.username;
    admin.phone = res.data.phone;
    admin.avatar = res.data.avatar;
    admin.alias = res.data.alias;
    admin.address = res.data.address;
    admin.shop_name = res.data.shop_name;

    //获取未处理订单
    this.orders = (await getOutstandingOrders()).data;
    this.orders.sort(
      (pre, next) => pre.userOrder.create_time - next.userOrder.create_time
    );

    //websocket
    this.socket = orderSocket({
      username: admin.username,
    });

    this.socket.addEventListener("message", (e) => {
      const res = JSON.parse(e.data);
      this.orders.push(res.data);
      console.log(res.data);
      if (res.status) {
      } else {
        this.$notify.error({
          title: "错误",
          message: "服务器可能已崩溃",
        });
      }
    });
  },
  methods: {
    warningMsg() {
      this.$message({
        message: "功能尚未开放，敬请期待！",
        type: "warning",
      });
    },
  },
};
</script>

<style lang="scss">
.index {
  $navH: 8vh;
  $min-navH: 60px;
  $containerH: 100vh - $navH;
  $containerMaxHeight: calc(100vh - #{$min-navH});

  .header {
    width: 100%;
    height: $navH;
    min-height: $min-navH;
    background: #01c5aa;
    color: #fff;

    .logo {
      margin-left: 40px;
      float: left;
      height: 100%;
      display: flex;
      align-items: center;

      &-title {
        color: #fff;
        font-size: 1rem;
        font-weight: 700;
        margin-left: 10px;
      }

      &-icon {
        width: 50px;
        height: 50px;
        background: {
          image: url(~@/assets/img/logo.png);
          size: 100% 100%;
        }
      }
    }

    .menu {
      margin-right: 40px;
      height: 100%;
      float: right;
      display: flex;
      align-items: center;

      .username {
        margin-left: 20px;
      }

      .el-badge {
        margin-right: 20px;
        position: relative;
        font-size: 20px;
      }
    }
  }

  .el-container {
    height: $containerH;
    max-height: $containerMaxHeight;
    min-height: 500px;

    .aside {
      min-width: 240px;
      user-select: none;
      height: 100%;
      position: relative;
      z-index: 9;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
      }

      & > .el-menu {
        height: 100%;
      }
      .el-badge__content.is-fixed {
        right: -10px;
        top: 25px;
      }
    }

    .main {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      background: #d9e4f0;
    }

    .footer {
      $height: 50px;
      width: 100%;
      height: $height;
      position: fixed;
      bottom: 0;
      font: {
        size: 18px;
        family: myFont1;
        weight: 700;
      }
      color: #666;
      text-align: center;
      line-height: $height;
      background: #ebeef5;
    }
  }
}
</style>
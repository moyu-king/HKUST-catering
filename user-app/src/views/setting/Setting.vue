<template>
  <div class="setting">
    <NavBar title="设置">
      <template #left>
        <div class="navBar-left" @click="goBack">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </div>
      </template>
    </NavBar>
    <van-cell-group title="信息" :border="false">
      <van-cell title="个人信息" clickable @click="jump('/user-info')">
        <template #icon>
          <i class="iconfont icon-user-setting" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="账号" :border="false">
      <van-cell title="切换账号" clickable to="/login">
        <template #icon>
          <i class="iconfont icon-exchange" />
        </template>
      </van-cell>
      <van-cell
        title="注销账号"
        clickable
        icon-prefix="login-out"
        @click="loginOut"
      >
        <template #icon>
          <i class="iconfont icon-login-out" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
export default {
  name: "Setting",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    jump(path) {
      if (localStorage.getItem("token")) {
        this.$router.push(path);
      } else {
        this.$toast({
          message: "未登录",
        });
      }
    },
    loginOut() {
      if (localStorage.getItem("token")) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否退出账号？",
          })
          .then(() => {
            localStorage.removeItem("token");
            this.$router.push("/");
          });
      } else {
        this.$toast({
          message: "未登录",
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
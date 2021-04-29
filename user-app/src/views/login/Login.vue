<template>
  <div class="login">
    <div ref="header" class="login-header">
      <div class="login-header-back">
        <router-link to="/profile">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </router-link>
      </div>
      <header-background></header-background>
    </div>
    <div class="login-container">
      <form-box title="用户登录">
        <form-box-input
          v-model="loginForm.studentId"
          icon="idcard"
          placeholder="学号"
        ></form-box-input>
        <form-box-input
          v-model="loginForm.password"
          icon="lock"
          placeholder="密码"
          type="password"
        ></form-box-input>
      </form-box>
      <div class="login-help">忘记密码？</div>
      <van-button type="primary" size="large" color="#fe4e36" @click="login">
        登录
      </van-button>
    </div>
    <div class="login-footer">
      <span>尚未拥有账号？</span>
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import HeaderBackground from "@/components/canvas/header-background";
import { FormBox, FormBoxInput } from "@/components/form-box";
import { userLogin } from "@/service/login";

export default {
  name: "Login",
  inject: ["tabBar"],
  components: {
    "header-background": HeaderBackground,
    "form-box": FormBox,
    "form-box-input": FormBoxInput,
  },
  data() {
    return {
      focusActive: false,
      loginForm: {
        studentId: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const res = await userLogin({
        studentId: this.loginForm.studentId,
        password: this.loginForm.password,
      });
      if (res.status) {
        localStorage.setItem("token", res.data.token);
        this.$router.push("/profile");
      }
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
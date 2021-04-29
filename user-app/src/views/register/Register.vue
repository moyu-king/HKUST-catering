<template>
  <div class="register">
    <div class="register-header">
      <div class="register-header-back">
        <router-link to="/login">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </router-link>
      </div>
      <header-background></header-background>
    </div>
    <div class="register-container">
      <form-box title="注册">
        <form-box-input
          v-model="registerForm.studentId"
          icon="idcard"
          placeholder="学号"
        />
        <form-box-input
          v-model="registerForm.name"
          icon="manager-o"
          placeholder="姓名"
        />
        <form-box-input
          v-model="registerForm.password"
          icon="lock"
          placeholder="密码"
          type="password"
        />
      </form-box>
      <van-button type="primary" size="large" color="#fe4e36" @click="submit">
        注册
      </van-button>
    </div>
    <div class="register-footer">
      <span>已拥有账号,立即前往&nbsp;&nbsp;</span>
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
import HeaderBackground from "@/components/canvas/header-background";
import { FormBox, FormBoxInput } from "@/components/form-box";
import { userRegister } from "@/service/register";

export default {
  name: "Register",
  components: {
    "header-background": HeaderBackground,
    "form-box": FormBox,
    "form-box-input": FormBoxInput,
  },
  data() {
    return {
      registerForm: {
        studentId: "",
        name: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      const res = await userRegister({
        studentId: this.registerForm.studentId,
        name: this.registerForm.name,
        password: this.registerForm.password,
      });

      if (res.status) {
        this.$toast.success("注册成功");
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
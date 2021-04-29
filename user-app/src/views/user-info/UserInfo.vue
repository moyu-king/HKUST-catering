<template>
  <div class="user-info">
    <NavBar title="个人信息">
      <template #left>
        <div class="navBar-left" @click="goBack">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </div>
      </template>
    </NavBar>
    <div class="user-info-avatar">
      <van-image round width="6rem" height="6rem" :src="user.avatar" />
      <span>修改头像</span>
    </div>
    <div class="user-info-base" v-if="!reset">
      <van-cell-group title="基础信息" :border="false">
        <van-cell
          title="学号"
          :value="user.studentId"
          clickable
          @click="notModify"
        ></van-cell>
        <cell-popup-input
          v-model="user.username"
          title="姓名"
          :rules="[{ pattern: /^.{1,6}$/, message }]"
        />
        <cell-popup-input
          v-model="user.phone"
          title="手机号"
          :rules="[{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message }]"
        />
        <cell-popup-input v-model="user.address" title="住址" />
      </van-cell-group>
    </div>
    <van-button
      round
      type="primary"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      :disabled="updateButton.disabled"
      :loading="updateButton.loading"
      :text="updateButton.text"
      @click="updateInfo"
    />
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar";
import { getUserInfo, updateUserInfo } from "@/service/user";
import { CellPopupInput } from "@/components/form-box";
export default {
  name: "UserInfo",
  components: {
    NavBar,
    "cell-popup-input": CellPopupInput,
  },
  data() {
    return {
      reset: false,
      user: {
        avatar: "",
        studentId: "",
        username: "",
        phone: "",
        address: "",
      },
      updateButton: {
        disabled: true,
        loading: false,
        text: "修改",
      },
    };
  },
  async mounted() {
    this.user = (await getUserInfo()).data;
    //在数据加载完毕后添加监听
    this.$watch("user", {
      handler() {
        this.updateButton.disabled = false;
      },
      deep: true,
    });
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    notModify() {
      this.$toast({
        message: "学号不可修改",
        position: "bottom",
      });
    },
    message(value) {
      return value === "" ? "无输入" : "请正确输入";
    },
    async updateInfo() {
      this.updateButton.loading = true;

      const res = await updateUserInfo({
        username: this.user.username,
        phone: this.user.phone,
        address: this.user.address,
      });

      if (res.status) {
        this.$toast.success("修改成功");
        this.updateButton.loading = false;
        this.updateButton.disabled = false;
        //刷新
        this.reset = true;
        this.$nextTick(() => {
          this.reset = false;
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
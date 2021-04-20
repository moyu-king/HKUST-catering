<template>
  <el-row type="flex" justify="center" align="center" class="login">
    <el-col :xs="20" :sm="12" :md="10" :lg="7">
      <el-card class="box-card">
        <div slot="header" class="clearfix card-header">
          <span>欢迎</span>
          <span>登录</span>
        </div>
        <div class="logo">
          <img src="@/assets/img/logo.png" alt="logo" class="logo-icon" />
          <span class="logo-title">科大餐饮</span>
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <h4><i class="el-icon-user-solid"></i>用户名</h4>
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <div class="pass-tip">
              <h4><i class="el-icon-key"></i>密码</h4>
            </div>
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="button-item">
            <el-button
              id="login"
              :type="button.login.type"
              :disabled="button.login.disabled"
              :loading="button.login.loading"
              @click="submitForm('ruleForm')"
              >{{ button.login.text }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div class="footer">
        <span><i class="el-icon-info"></i>&nbsp;暂未开通自助密码找回功能</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { btnLoading, btnLoadingClose } from "@/utils/loading";
import { login } from "@/service/login";
export default {
  name: "Login",
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else callback();
    };
    return {
      avatar: "",
      button: {
        login: {
          text: "登录",
          type: "primary",
          loading: false,
          disabled: false,
        },
      },
      ruleForm: {
        pass: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          btnLoading(this.button.login);

          const res = await login({
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
          });
          
          if (res.status) {
            this.$notify({
              title: "成功",
              message: res.message,
              type: "success",
            });

            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }

          btnLoadingClose(this.button.login, "登录");
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login {
  min-width: 320px;
  padding-top: 100px;

  .el-card__body {
    display: block;
  }

  .box-card {
    padding: 10px;
    background: url(~@/assets/img/login-bg.jpg);
    background-size: contain;

    .card-header {
      color: #000;
      font: {
        size: 20px;
        weight: 700;
        family: myFont1;
      }
      & > span:first-child {
        color: #edd388;
      }
    }
    .logo {
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      &-icon {
        width: 60px;
        height: 60px;
      }
      &-title {
        margin-left: 10px;
        font: {
          family: myFont1;
          size: 24px;
          weight: 700;
        }
      }
    }

    .avatar {
      text-align: center;
      font-size: 30px;
      user-select: none;
    }
    .pass-tip {
      display: flex;
      justify-content: space-between;
      .link {
        font-weight: 500;
        user-select: none;
      }
    }
    .button-item {
      margin-top: 40px;
    }
  }
  #login {
    width: 100%;
    display: block;
    margin: 0 auto 0;
  }
  .footer {
    padding: 30px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 10px;
    }
  }
}

h4 {
  margin: 0;
  i {
    padding-right: 8px;
  }
}

a {
  color: #409eff;
  text-decoration: none;
}
</style>
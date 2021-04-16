<template>
  <div class="shopPass">
    <div class="old" :class="{ active: active }">
      <el-card>
        <div slot="header" class="title">原密码</div>
        <el-form
          :model="oldForm"
          :rules="rules_old"
          ref="oldForm"
          label-width="80px"
          size="medium"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldPass">
            <el-input
              type="password"
              v-model="oldForm.oldPass"
              autocomplete="off"
              class="oldPass"
            ></el-input>
            <el-button
              type="primary"
              size="medium"
              @click="nextStep('oldForm')"
              class="next"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
      <p class="describe">
        <i class="el-icon-warning"></i>&nbsp; 修改密码需要输入原密码，以验证身份
      </p>
    </div>
    <div class="new" :class="{ active: active }">
      <el-card>
        <div slot="header" class="title">新密码</div>
        <el-form
          :model="newForm"
          :rules="rules_new"
          ref="newForm"
          label-width="80px"
          size="medium"
          class="demo-ruleForm"
        >
          <el-form-item label="新密码" prop="newPass">
            <el-input
              type="password"
              v-model="newForm.newPass"
              autocomplete="off"
              class="newPass"
            ></el-input>
            <div class="tip">
              <i>*格式：6-18位且只能是数字和字母</i>
            </div>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="newForm.checkPass"
              autocomplete="off"
              :show-password="true"
              class="checkPass"
            ></el-input>
            <el-button
              type="primary"
              size="medium"
              class="modify"
              @click="modifyPass('newForm')"
              >修改</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
      <p class="describe">
        <i class="el-icon-info"></i>&nbsp; 修改后记得保管好自己的密码哦！
      </p>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span
        ><i class="el-icon-info" style="color: #67c23a"></i
        >&nbsp;密码修改成功！是否前往登录界面？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="jump">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validatePass, updatePass } from "@/service/request";
export default {
  name: "ShopPass",
  data() {
    //密码 规则：6-18位且只能是数字和字母
    let passRegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    let validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您想修改的密码"));
      } else if (!passRegExp.test(value))
        callback(new Error("6-18位，只能是且必须包含数字和字母"));
      else {
        if (this.newForm.checkPass !== "") {
          this.$refs.newForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else if (!passRegExp.test(value)) {
        callback(new Error("密码格式错误！"));
      } else {
        callback();
      }
    };
    //确认密码
    let validateCheckPass = (rule, value, callback) => {
      if (value === "") callback(new Error("请再次输入密码"));
      else if (value !== this.newForm.newPass)
        callback(new Error("两次输入的密码不一致"));
      else callback();
    };
    return {
      centerDialogVisible: false,
      active: false,
      oldForm: {
        oldPass: "",
      },
      newForm: {
        newPass: "",
        checkPass: "",
      },
      rules_old: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
      },
      rules_new: {
        newPass: [{ validator: validateNewPass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    modifyPass(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let password = this.newForm.newPass;
          let res = await updatePass({ password });
          if (res.data.status) {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success",
              duration: 2000,
            });
            this.$store.commit("delToken");
            this.centerDialogVisible = true;
          }
        } else {
          return false;
        }
      });
    },
    nextStep(formName) {
      this.$refs[formName].validateField("oldPass", async (error) => {
        if (!error) {
          let oldPass = this.oldForm.oldPass;
          this.active = true;
          // try {
          //   let result = await validatePass({ password: oldPass });
          //   if (result.data.status) this.active = true;
          // } catch (e) {
          //   new Error();
          // }
        } else {
          return false;
        }
      });
    },
    jump() {
      this.centerDialogVisible = false;
      this.$router.push("/login");
    },
    cancel() {
      this.centerDialogVisible = false;
    },
  },
};
</script>

<style lang="scss">
.shopPass {
  margin: 10vh auto 0;
  max-width: 800px;
  position: relative;
  .new,
  .old {
    position: absolute;
    width: 100%;
  }
  .new {
    transform: scale(0);
  }
  .old.active {
    transition: transform 0.7s ease;
    transform: scale(0);
  }
  .new.active {
    transition: transform 0.8s cubic-bezier(0.74, 0.05, 0.3, 1.48) 0.5s;
    transform: scale(1);
  }
  .title {
    font-size: 24px;
    font-family: myFont2;
    text-align: left;
  }
  .next,
  label {
    font-size: 14px;
  }
  .old {
    .el-card__body {
      height: 120px;
      display: flex;
      align-items: center;
    }
    .oldPass {
      width: 400px;
    }
  }
  .new {
    .el-form-item {
      margin-bottom: 40px;
    }
    .el-form-item__content {
      display: flex;
    }
    .newPass,
    .checkPass {
      width: 350px;
    }
    .tip {
      color: #909399;
      font-size: 12px;
      margin-left: 20px;
    }
  }
  .next,
  .modify {
    width: 120px;
    margin-left: 40px;
  }
  .describe {
    margin-top: 30px;
    text-align: center;
    font-size: 13px;
    color: #999;
  }
}
</style>
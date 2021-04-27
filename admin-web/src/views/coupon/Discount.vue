<template>
  <el-card class="discount">
    <div slot="header">
      <span>发行优惠券</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="优惠券标题：" prop="title">
        <el-input
          show-word-limit
          v-model="form.title"
          placeholder="优惠券标题，例如：喜庆迎新春"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="使用门槛：" prop="limit">
        <el-input
          v-model="form.limit"
          placeholder="例如：填写20，即为满20元起使用"
        ></el-input>
      </el-form-item>
      <el-form-item label="使用额度：" prop="amount">
        <el-input v-model="form.amount" placeholder="优惠券额度"></el-input>
      </el-form-item>
      <el-form-item label="截止时间：" prop="expiresIn">
        <el-date-picker
          v-model="form.expiresIn"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="issue('form')">发行</el-button>
        <el-button type="warning" @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { addCoupon } from "@/service/coupon";
export default {
  name: "Discount",
  data() {
    let regExp1 = /^[1-9]\d*(\.\d*)?|0\.\d*[1-9]\d*$/; //正浮点数和正整数
    let regExp2 = /^[1-9]\d*(\.\d*)?|0(\.\d*[1-9]\d*)?$/; //正浮点数和正整数和0
    let validateAmount = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入额度"));
      else if (value === "0") callback(new Error("额度为0优惠券无意义"));
      else if (!regExp1.test(value)) callback(new Error("额度值应为数值类型"));
      else callback();
    };
    let validateLimit = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入使用门槛"));
      else if (!regExp2.test(value)) callback(new Error("门槛值应为数值类型"));
      else callback();
    };
    let validateTitle = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入优惠券标题"));
      else callback();
    };
    let validateExpiresIn = (rule, value, callback) => {
      if (value === "") callback(new Error("优惠券使用期不能为空"));
      else callback();
    };
    return {
      form: {
        title: "",
        amount: "",
        expiresIn: "",
        limit: "",
      },
      rules: {
        amount: [{ validator: validateAmount, trigger: "blur" }],
        limit: [{ validator: validateLimit, trigger: "blur" }],
        title: [{ validator: validateTitle, trigger: "blur" }],
        expiresIn: [{ validator: validateExpiresIn, trigger: "blur" }],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    issue(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let start = new Date(this.form.expiresIn[0]).getTime();
          let end = new Date(this.form.expiresIn[1]).getTime();
          const res = await addCoupon({
            create_time: start,
            expireIn: end,
            title: this.form.title,
            discount: this.form.amount,
            limit: this.form.limit,
          });
          if (res.status) {
            this.$notify({
              title: "成功",
              message: res.message,
              type: "success",
            });
          }
        } else return false;
      });
    },
  },
};
</script>

<style lang="scss">
$btnW: 100px;

.discount {
  width: 70%;
  margin: 10vh auto 80px;
  max-width: 1200px;
  .el-card__body {
    justify-content: center;
  }
  .el-form {
    width: 55%;
    .el-button {
      width: $btnW;
    }
  }
}
</style>
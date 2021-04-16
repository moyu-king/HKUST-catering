<template>
  <el-card class="addFood">
    <div slot="header">
      <span>添加新菜式</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item prop="name" label="菜名：">
        <el-input
          v-model="form.name"
          placeholder="菜名"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item class="type" prop="type" label="类型：">
        <el-select v-model="form.type" placeholder="类型">
          <el-option
            v-for="type in foodType"
            :key="type"
            :label="type"
            :value="type"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="price" prop="price" label="价格：">
        <el-input v-model="form.price" placeholder="单位：元"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="描述：">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="菜品描述，可以不填。（建议填写）"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addFoodMenu('form')">添 加</el-button>
        <el-button type="warning" @click="resetForm('form', 'upload')"
          >清 空</el-button
        >
      </el-form-item>
    </el-form>
    <div class="upload-box">
      <div class="title">
        <i class="el-icon-upload"></i>
        添加菜品图片
      </div>
      <el-upload
        ref="upload"
        list-type="picture-card"
        :action="uploadServer"
        :file-list="fileList"
        :auto-upload="false"
        :limit="3"
        :on-exceed="handleExceed"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div class="tip">图片大小640*640极佳，最多上传3张图片</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "AddFood",
  data() {
    let regExp = /^[1-9]\d*(\.\d+)?$/;
    let validatePrice = (rule, value, callback) => {
      if (value === "") return callback(new Error("请输入价格"));
      else if (!regExp.test(value))
        return callback(new Error("请正确填写价格"));
      else return callback();
    };
    return {
      foodType: ["荤", "素"],
      uploadServer: "http://127.0.0.1:3000/admin/food/upload",
      form: {
        name: "",
        type: "",
        price: "",
        description: "",
      },
      rules: {
        price: [{ validator: validatePrice, trigger: "blur" }],
      },
      fileList: [],
    };
  },
  methods: {
    addFoodMenu(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("验证成功！");
        } else return false;
      });
    },
    resetForm(formName, uploadName) {
      this.$refs[formName].resetFields();
      this.$refs[uploadName].clearFiles();
      this.$message({
        type: "success",
        message: "表单已清空！",
        showClose: true,
      });
    },
    handleExceed() {
      this.$message({
        type: "warning",
        message: "最多上传3张图片",
        showClose: true,
      });
    },
  },
};
</script>

<style lang="scss">
.addFood {
  width: 70%;
  max-width: 1200px;
  margin: 10vh auto 30px;

  .el-form {
    width: 55%;
  }

  .el-card__body {
    height: 400px;
  }

  .type {
    width: 250px;
  }

  .el-input,
  .el-textarea {
    width: 85%;
  }

  .el-button {
    width: 80px;
  }

  .upload-box {
    width: 45%;
    i {
      color: #909399;
    }

    .title,
    .tip {
      font: {
        size: 16px;
        family: myFont3;
      }
    }
    .title {
      margin-bottom: 20px;
    }
    .tip {
      margin-top: 20px;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
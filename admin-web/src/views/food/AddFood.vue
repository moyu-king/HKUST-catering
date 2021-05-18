<template>
  <el-card class="addFood">
    <div slot="header">
      <span>添加新菜式</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item prop="food_name" label="菜名：">
        <el-input
          v-model="form.food_name"
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
        <el-button type="primary" @click="onSubmit">添 加</el-button>
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
        :limit="1"
        :auto-upload="false"
        :headers="headers"
        :action="uploadServer"
        :file-list="fileList"
        :http-request="addFoodMenu"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div class="tip">图片大小640*640极佳，目前最多上传1张图片</div>
    </div>
  </el-card>
</template>

<script>
import { API_BASE_URL } from "@/service";
import { addNewFoodToMenu } from "@/service/food";

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
      uploadServer: `${API_BASE_URL}/foodImage_upload`,
      form: {
        food_name: "",
        type: "",
        price: "",
        description: "",
      },
      rules: {
        price: [{ validator: validatePrice, trigger: "blur" }],
      },
      fileList: [],
      fileStatus: true,
    };
  },
  computed: {
    headers() {
      return { authorization: "Bearer " + localStorage.getItem("adminToken") };
    },
  },
  methods: {
    async addFoodMenu(param) {
      const formData = new FormData();

      formData.append("file", param.file);
      Object.entries(this.form).forEach((field) => {
        formData.append(field[0], field[1]);
      });

      const res = await addNewFoodToMenu(formData);

      if (res.status) {
        this.$notify({
          title: "成功",
          message: "菜式信息已添加",
          type: "success",
        });
      }
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid && this.fileList.length) {
          if (!this.fileStatus) {
            this.$message.error("上传之前请先处理好错误的图片格式！");
          } else {
            this.$refs["upload"].submit();
          }
        } else {
          this.$message.error("请认真填写好菜式信息！");
          return false;
        }
      });
    },
    resetForm(formName, uploadName) {
      this.$refs[formName].resetFields();
      this.$refs[uploadName].clearFiles();
    },
    handleExceed() {
      this.$message({
        type: "warning",
        message: "抱歉，目前最多上传1张图片",
        showClose: true,
      });
    },
    handleChange(file, fileList) {
      this.fileList = fileList;

      const isIMAGE =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2; //图片需小于2M

      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      this.fileStatus = isIMAGE && isLt2M;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
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
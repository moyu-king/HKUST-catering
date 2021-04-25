<template>
  <div class="putFood">
    <el-card class="food-original">
      <div slot="header" class="clearfix">
        <span>现有菜单</span>
      </div>
      <el-table
        stripe
        class="food-original-table"
        ref="foodTable"
        :data="tableData"
        @select="handleSelection"
        @select-all="handleSelection"
      >
        <el-table-column
          type="selection"
          header-align="left"
          align="left"
          prop="prop"
          label="label"
        ></el-table-column>
        <el-table-column label="菜名" prop="food_name"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="价格（元）" prop="price"></el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input
              v-model="searchValue"
              prefix-icon="el-icon-search"
              placeholder="菜名"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <el-button
              suffix-icon="el-icon-search"
              size="mini"
              type="warning"
              @click="handleEditInfo(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="table-tools">
        <label for="date-put" class="label">上架时间：</label>
        <el-date-picker
          id="date-put"
          v-model="date"
          type="datetime"
          placeholder="选择日期"
          size="medium"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="08:00:00"
          :clearable="false"
        >
        </el-date-picker>
        <label for="foodNum" class="label">数量：</label>
        <el-input id="foodNum" v-model="foodNum"></el-input>
        <el-button type="primary" size="medium" @click="foodPutOn"
          >上架</el-button
        >
      </div>
    </el-card>
    <el-card class="food-put">
      <div slot="header" class="clearfix">
        <span>上架菜单</span>
      </div>
      <el-table
        stripe
        class="food-put-table"
        :data="foodPut"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @select="handleSelection"
        @select-all="handleSelection"
      >
        <el-table-column
          label="上架日期"
          prop="date"
          sortable
        ></el-table-column>
        <el-table-column label="菜名" prop="food_name"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="价格（元）" prop="price"></el-table-column>
        <el-table-column label="数量" prop="number"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEditNum(scope.row)"
              >修改数量</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handlePutOff(scope.row)"
              >下架</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改菜单 -->
    <el-dialog
      width="40%"
      :title="dialogModifyInfo.name"
      :visible.sync="dialogModifyInfo.visible"
    >
      <el-form :model="form" class="food-modify">
        <el-form-item label="菜名：" label-width="70px">
          <el-input v-model="form.food_name"></el-input>
        </el-form-item>
        <el-form-item label="价格：" label-width="70px">
          <el-input v-model="form.price" placeholder="单位：元"></el-input>
        </el-form-item>
        <el-form-item label="类型：" label-width="70px">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="type in foodTypes"
              :key="type"
              :label="type"
              :value="type"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyInfo.visible = false">取 消</el-button>
        <el-button type="primary" @click="foodInfoModify">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog :visible.sync="dialogDelete.visible" width="30%">
      <div class="digalog-title" slot="title">
        <i class="el-icon-warning"></i>
        <span>警告</span>
      </div>
      <span>
        确定删除&nbsp;
        <strong>{{ dialogDelete.name }}</strong>
        &nbsp;吗？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete.visible = false">取 消</el-button>
        <el-button type="primary" @click="foodDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下架 -->
    <el-dialog :visible.sync="dialogPutOff.visible" width="30%">
      <div class="digalog-title" slot="title">
        <i class="el-icon-warning"></i>
        <span>警告</span>
      </div>
      <span>
        确定下架&nbsp;
        <strong>{{ dialogPutOff.date }}</strong
        >&nbsp;的<strong> {{ dialogPutOff.name }}</strong>
        &nbsp;吗？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPutOff.visible = false">取 消</el-button>
        <el-button type="primary" @click="foodPutOff">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改数量 -->
    <el-dialog
      width="40%"
      :visible.sync="dialogModifyNum.visible"
      @close="handleDialogClose('modifyForm')"
    >
      <div class="digalog-title" slot="title">
        <span>{{ dialogModifyNum.date }}</span>
        &nbsp;的&nbsp;
        <span>"{{ dialogModifyNum.name }}"</span>
      </div>
      <el-form
        class="food-modify"
        :model="modifyForm"
        :rules="modifyRules"
        ref="modifyForm"
      >
        <el-form-item label="修改数量：" label-width="100px" prop="modifyNum">
          <el-input
            v-model="modifyForm.modifyNum"
            placeholder="菜品数量"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyNum.visible = false">取 消</el-button>
        <el-button type="primary" @click="foodModifyNum">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 确认覆盖还是添加 -->
    <el-dialog :visible.sync="dialogDuplicate.visible" width="30%">
      <div class="digalog-title" slot="title">
        <i class="el-icon-warning"></i>
        <span>重复项</span>
      </div>
      <span>
        发现&nbsp;
        <strong>{{ dialogDuplicate.duplication }}</strong>
        &nbsp;项重复项
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDuplicate.visible = false"
          >取 消</el-button
        >
        <el-button type="warning" @click="handleDuplicate(0)">累 加</el-button>
        <el-button type="danger" @click="handleDuplicate(1)">覆 盖</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/format";
import { getFood, updateFoodInfo, deleteFood } from "@/service/food";
import {
  getFoodMenu,
  addFoodMenu,
  addDuplicateFoodMenu,
  updateFoodMenuNum,
  deleteFoodMenu,
} from "@/service/food_menu";

export default {
  name: "PutFood",
  data() {
    let validateNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入要修改的数量"));
      } else if (!/^\d+$/.test(value)) {
        callback(new Error("数量应为数字值"));
      } else {
        callback();
      }
    };
    return {
      date: "",
      foodNum: "",
      searchValue: "",
      multipleSelection: [],
      foodTypes: ["素", "荤"],
      dialogDelete: { visible: false, name: "", food_id: "" },
      dialogModifyInfo: { visible: false, name: "", food_id: "" },
      dialogModifyNum: { visible: false, name: "", food_menu_id: "" },
      dialogPutOff: { visible: false, name: "", food_menu_id: "" },
      dialogDuplicate: { visible: false, duplication: "", sub: {} },
      form: {
        food_name: "",
        type: "",
        price: "",
      },
      modifyForm: {
        modifyNum: "",
      },
      modifyRules: {
        modifyNum: [{ validator: validateNum, trigger: "blur" }],
      },
      foodOriginal: [],
      foodPut: [],
    };
  },
  computed: {
    tableData() {
      return this.foodOriginal.filter(
        (data) =>
          !this.searchValue ||
          data.food_name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  },
  watch: {
    tableData() {
      this.$nextTick(() => {
        this.multipleSelection.forEach((item) => {
          this.$refs.foodTable.toggleRowSelection(item);
        });
      });
    },
  },
  async created() {
    this.foodOriginal = (await getFood()).data;
    this.foodPut = (await getFoodMenu()).data;
  },
  methods: {
    handleDialogClose(formName) {
      this.$refs[formName].resetFields();
    },
    handleDelete(row) {
      this.dialogDelete.visible = true;
      this.dialogDelete.food_id = row.food_id;
      this.dialogDelete.name = row.food_name;
    },
    handlePutOff(row) {
      this.dialogPutOff.visible = true;
      this.dialogPutOff.name = row.food_name;
      this.dialogPutOff.date = row.date;
      this.dialogPutOff.food_menu_id = row.food_menu_id;
    },
    handleEditNum(row) {
      this.dialogModifyNum.visible = true;
      this.dialogModifyNum.name = row.food_name;
      this.dialogModifyNum.date = row.date;
      this.dialogModifyNum.food_menu_id = row.food_menu_id;
      this.modifyForm.modifyNum = row.number;
    },
    handleEditInfo(row) {
      this.dialogModifyInfo.visible = true;

      this.dialogModifyInfo.food_id = row.food_id;
      this.dialogModifyInfo.name = row.food_name;
      this.form.type = row.type;
      this.form.price = row.price;
      this.form.food_name = row.food_name;
    },
    handleSelection(val) {
      this.multipleSelection = val;
    },
    async foodDelete() {
      //发起删除请求
      const res = await deleteFood({
        food_id: this.dialogDelete.food_id,
      });

      if (res.status) {
        //浏览器本地删除
        this.foodOriginal = this.foodOriginal.filter(
          (item) => item.food_name !== this.dialogDelete.name
        );
        //显示成功信息
        this.$notify({
          title: "成功",
          type: "success",
          message: "菜单已删除!",
          duration: 2000,
        });
        //关闭弹出层
        this.dialogDelete.visible = false;
      }
    },
    async foodPutOff() {
      const res = await deleteFoodMenu({
        food_menu_id: this.dialogPutOff.food_menu_id,
      });
      if (res.status) {
        this.foodPut = this.foodPut.filter(
          (item) => item.food_menu_id !== this.dialogPutOff.food_menu_id
        );
        this.dialogPutOff.visible = false;
        this.$notify({
          title: "成功",
          message: "菜单已下架！",
          type: "success",
          duration: 2000,
        });
      }
    },
    async foodPutOn() {
      let date = this.date;
      if (!this.multipleSelection.length) {
        this.$notify.error({
          title: "错误",
          message: "还未添加菜单！",
          duration: 2000,
        });
      } else if (!this.foodNum || !date) {
        this.$notify.error({
          title: "错误",
          message: "请认真填写必要信息！",
          duration: 2000,
        });
      } else if (
        new Date().getTime() - 24 * 60 * 60 * 1000 >
        new Date(date).getTime()
      ) {
        this.$notify.error({
          title: "错误",
          message: "选择的日期不在有效范围之内!",
          duration: 2000,
        });
      } else {
        date = dateFormat(date);
        let duplication = 0; //累计重复项
        let number = this.foodNum * 1;

        this.multipleSelection.forEach((selection) => {
          //在已上架列表找出与multipleSelection中food_id和date相同的项
          let index = this.foodPut.findIndex(
            (item) => item.food_id === selection.food_id && item.date === date
          );
          //如果找到了进行对应处理
          if (index !== -1) {
            duplication += 1;
          }
        });

        //返回food_id数组，用以提交
        const foods_id = [];
        this.multipleSelection.forEach((item) => {
          foods_id.push(item.food_id);
        });

        if (!duplication) {
          //无重复项
          const res = await addFoodMenu({
            date: new Date(this.date).getTime(),
            number: this.foodNum,
            foods_id,
          });
          //数据回显
          if (res.status) {
            this.foodPut = (await getFoodMenu()).data;
            //清除表单域
            this.foodNum = "";
            this.date = "";
            this.$refs["foodTable"].clearSelection();
            this.multipleSelection = [];
            //显示成功信息
            this.$notify({
              title: "成功",
              type: "success",
              message: "上架成功！",
              duration: 2000,
            });
          }
        } else {
          //存在重复项
          this.dialogDuplicate.visible = true;
          this.dialogDuplicate.duplication = duplication;
          this.dialogDuplicate.sub = {
            date,
            number,
            foods_id,
          };
        }
      }
    },
    async handleDuplicate(operate) {
      const { number, date, foods_id } = this.dialogDuplicate.sub;

      const res = await addDuplicateFoodMenu({
        operate,
        foods_id,
        date: new Date(date).getTime(),
        number,
      });
      //数据回显
      if (res.status) {
        this.foodPut = (await getFoodMenu()).data;
        //finish
        this.foodNum = "";
        this.date = "";
        this.$refs["foodTable"].clearSelection();
        this.multipleSelection = [];
        this.dialogDuplicate.visible = false;
        this.$notify({
          title: "成功",
          message: "操作已完成",
          type: "success",
        });
      }
    },

    async foodInfoModify() {
      //发情请求
      const result = await updateFoodInfo({
        food_id: this.dialogModifyInfo.food_id,
        food_name: this.form.food_name,
        type: this.form.type,
        price: this.form.price,
      });

      if (result.status) {
        //前端处理回显，可省去http请求
        this.foodOriginal.forEach((item) => {
          if (item.food_name === this.dialogModifyInfo.name) {
            item.food_name = this.form.food_name;
            item.type = this.form.type;
            item.price = this.form.price;
          }
        });
        //显示成功信息
        this.$notify({
          title: "成功",
          type: "success",
          message: "菜单修改修改成功!",
          duration: 2000,
        });
        //关闭弹出层
        this.dialogModifyInfo.visible = false;
      }
    },
    async foodModifyNum() {
      const res = await updateFoodMenuNum({
        number: this.modifyForm.modifyNum,
        food_menu_id: this.dialogModifyNum.food_menu_id,
      });
      //本地浏览器处理回显
      if (res.status) {
        let number = this.modifyForm.modifyNum;
        this.foodPut.find(
          (food) => food.food_menu_id === this.dialogModifyNum.food_menu_id
        ).number = number;

        this.dialogModifyNum.visible = false;

        this.$notify({
          title: "成功",
          type: "success",
          message: "修改成功！",
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.putFood {
  $elMarginTop: 30px;
  $elWidth: 90%;

  .el-card__body {
    flex-direction: column;
  }

  .food-modify {
    padding: 0 40px;
  }

  .digalog-title > i {
    font-size: 18px;
    margin-right: 5px;
    color: #f56c6c;
  }

  .food-original,
  .food-put {
    width: $elWidth;
    margin: $elMarginTop auto 0;
    min-height: 400px;
    overflow-y: auto;
  }

  .table-tools {
    font-family: myFont3;
    margin: 30px 0 15px 0;
    .label {
      font-size: 14px;
      color: #999;
    }
    .el-button {
      width: 100px;
    }
    & > .el-input {
      width: 200px;
      margin-right: 20px;
    }
  }

  .food-put {
    margin-bottom: 80px;
  }

  .food-put-table,
  .food-original-table {
    max-height: 400px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.el-picker-panel__footer .el-button:first-child,
.el-date-picker__time-header {
  display: none;
}
</style>
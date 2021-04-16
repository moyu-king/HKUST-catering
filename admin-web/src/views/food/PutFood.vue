<template>
  <div class="putFood">
    <el-card class="food-original">
      <div slot="header" class="clearfix">
        <span>现有菜单</span>
      </div>
      <el-table
        stripe
        height="400px"
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
        <el-table-column label="菜名" prop="name"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="价格（元）" prop="price"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
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
          type="date"
          placeholder="选择日期"
          size="medium"
          value-format="yyyy-MM-d"
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
        height="400px"
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
        <el-table-column label="菜名" prop="name"></el-table-column>
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
          <el-input v-model="form.name"></el-input>
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
        <el-button type="primary" @click="foodModifyInfo">修 改</el-button>
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
        <strong>{{ dialogDuplicate.number }}</strong>
        &nbsp;项重复项
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDuplicate.visible = false"
          >取 消</el-button
        >
        <el-button type="warning" @click="handleDuplicate(1)">累 加</el-button>
        <el-button type="danger" @click="handleDuplicate(0)">覆 盖</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
      searchValue: "",
      multipleSelection: [],
      foodTypes: ["素", "荤"],
      foodNum: "",
      dialogDelete: { visible: false, name: "" },
      dialogModifyInfo: { visible: false, name: "" },
      dialogModifyNum: { visible: false, name: "" },
      dialogPutOff: { visible: false, name: "" },
      dialogDuplicate: { visible: false, number: "" },
      form: {
        name: "",
        type: "",
        price: "",
      },
      modifyForm: {
        modifyNum: "",
      },
      modifyRules: {
        modifyNum: [{ validator: validateNum, trigger: "blur" }],
      },
      foodOriginal: [
        { price: 10, name: "爆炒猪肝", type: "荤" },
        { price: 10, name: "红烧肉", type: "荤" },
        { price: 10, name: "辣子鸡", type: "荤" },
        { price: 10, name: "香菇滑鸡", type: "荤" },
        { price: 10, name: "酸菜鱼", type: "荤" },
        { price: 10, name: "麻婆豆腐", type: "荤" },
      ],
      foodPut: [
        {
          date: "2021-03-16",
          price: 10,
          name: "爆炒猪肝",
          type: "荤",
          number: 50,
        },
        {
          date: "2021-03-16",
          price: 10,
          name: "红烧肉",
          type: "荤",
          number: 50,
        },
        {
          date: "2021-03-16",
          price: 10,
          name: "辣子鸡",
          type: "荤",
          number: 50,
        },
        {
          date: "2021-03-17",
          price: 10,
          name: "香菇滑鸡",
          type: "荤",
          number: 50,
        },
        {
          date: "2021-03-17",
          price: 10,
          name: "酸菜鱼",
          type: "荤",
          number: 50,
        },
        {
          date: "2021-03-17",
          price: 10,
          name: "麻婆豆腐",
          type: "荤",
          number: 50,
        },
      ],
    };
  },
  computed: {
    tableData() {
      return this.foodOriginal.filter(
        (data) =>
          !this.searchValue ||
          data.name.toLowerCase().includes(this.searchValue.toLowerCase())
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
  created() {
    let now = new Date();
    this.date = this.timeFormat(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );
  },
  methods: {
    handleDialogClose(formName) {
      this.$refs[formName].resetFields();
    },
    handleDelete(row) {
      this.dialogDelete.visible = true;
      this.dialogDelete.name = row.name;
    },
    handlePutOff(row) {
      this.dialogPutOff.visible = true;
      this.dialogPutOff.name = row.name;
      this.dialogPutOff.date = row.date;
    },
    handleEditNum(row) {
      this.dialogModifyNum.visible = true;
      this.dialogModifyNum.name = row.name;
      this.dialogModifyNum.date = row.date;
      this.modifyForm.modifyNum = row.number;
    },
    handleEditInfo(row) {
      this.dialogModifyInfo.visible = true;
      this.dialogModifyInfo.name = row.name;
      this.form.type = row.type;
      this.form.price = row.price;
      this.form.name = row.name;
    },
    handleSelection(val) {
      this.multipleSelection = val;
    },
    foodDelete() {
      this.foodOriginal = this.foodOriginal.filter(
        (item) => item.name !== this.dialogDelete.name
      );
      this.dialogDelete.visible = false;
      this.$notify({
        title: "成功",
        type: "success",
        message: "菜单已删除!",
        duration: 2000,
      });
    },
    foodPutOff() {
      this.foodPut = this.foodPut.filter(
        (item) =>
          !(
            item.name === this.dialogPutOff.name &&
            item.date === this.dialogPutOff.date
          )
      );
      this.dialogPutOff.visible = false;
      this.$notify({
        title: "成功",
        message: "菜单已下架！",
        type: "success",
        duration: 2000,
      });
    },
    foodPutOn() {
      if (!this.multipleSelection.length) {
        this.$notify.error({
          title: "错误",
          message: "还未添加菜单！",
          duration: 2000,
        });
      } else if (!this.foodNum) {
        this.$notify.error({
          title: "错误",
          message: "数量不能为空",
          duration: 2000,
        });
      } else {
        let duplication = 0; //累计重复项
        let indexArrM = []; //保存MultipleSelection中存重复项的index
        let indexArrF = []; //保存FoodPut中重复项的index;
        let date = this.date;
        let number = this.foodNum * 1;
        let filterArr = this.foodPut.filter((item) => item.date === date);

        this.multipleSelection.forEach((selection, i) => {
          if (filterArr.find((item) => item.name === selection.name)) {
            let index = this.foodPut.findIndex(
              (item) => item.name === selection.name && item.date === date
            );
            duplication = duplication + 1;
            indexArrM.push(i);
            indexArrF.push(index);
          }
        });

        if (!indexArrM.length) {
          //无重复项
          this.multipleSelection.forEach((selection) => {
            let obj = {};
            for (let property in selection) {
              obj[property] = selection[property];
            }
            obj.date = date;
            obj.number = number;
            this.foodPut.push(obj);
          });
          //put on successfully：clear input、checkbox，show success tip;
          this.foodNum = "";
          this.$refs["foodTable"].clearSelection();
          this.multipleSelection = []; // reset multipleSelection
          this.$notify({
            title: "成功",
            type: "success",
            message: "上架成功！",
            duration: 2000,
          });
        } else {
          //存在重复项
          this.dialogDuplicate.visible = true;
          this.dialogDuplicate.number = duplication;
          this.dialogDuplicate.sub = {
            indexArrM,
            indexArrF,
            date,
            number,
          };
        }
      }
    },
    handleDuplicate(option) {
      let indexArrF = this.dialogDuplicate.sub.indexArrF;
      let indexArrM = this.dialogDuplicate.sub.indexArrM;
      let number = this.dialogDuplicate.sub.number;
      let date = this.dialogDuplicate.sub.date;

      //处理不重复的，添加
      this.multipleSelection.forEach((selection, i) => {
        if (indexArrM.indexOf(i) === -1) {
          let obj = {};
          for (let property in selection) {
            obj[property] = selection[property];
          }
          obj.date = date;
          obj.number = number;
          this.foodPut.push(obj);
        }
      });
      //处理重复的
      if (option === 0) {
        //0表示覆盖
        for (let index of indexArrF) {
          this.foodPut[index].number = number;
        }
      } else {
        //累加
        for (let index of indexArrF) {
          this.foodPut[index].number = this.foodPut[index].number + number;
        }
      }
      //finish
      this.foodNum = "";
      this.$refs["foodTable"].clearSelection();
      this.multipleSelection = [];
      this.dialogDuplicate.visible = false;
      this.$notify({
        title: "成功",
        message: "操作已完成",
        type: "success",
      });
    },
    foodModifyInfo() {
      this.dialogModifyInfo.visible = false;
      this.foodOriginal.forEach((item) => {
        if (item.name === this.dialogModifyInfo.name) {
          item.name = this.form.name;
          item.type = this.form.type;
          item.price = this.form.price;
        }
      });
      this.$notify({
        title: "成功",
        type: "success",
        message: "菜单修改修改成功!",
        duration: 2000,
      });
    },
    foodModifyNum() {
      //注意：如果这里选择和"现有菜单"同款搜索框，则需另外处理
      let number = this.modifyForm.modifyNum;
      let index = this.foodPut.findIndex(
        (item) =>
          item.date === this.dialogModifyNum.date &&
          item.name === this.dialogModifyNum.name
      );
      this.foodPut[index].number = number;
      this.dialogModifyNum.visible = false;
      this.$notify({
        title: "成功",
        type: "success",
        message: "修改成功！",
        duration: 2000,
      });
    },
    timeFormat(y, m, d) {
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      return `${y}-${m}-${d}`;
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
}
</style>
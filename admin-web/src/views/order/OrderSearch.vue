<template>
  <div class="orderSearch">
    <div class="date-search">
      <label for="date-picker">订单查询：</label>
      <el-date-picker
        id="date-picker"
        v-model="searchDate"
        type="month"
        format="yyyy-MM"
        value-format="yyyy-MM"
        placeholder="选择月份"
      >
      </el-date-picker>
      <el-button type="primary" @click="searchOrder">搜索</el-button>
    </div>
    <el-card class="order-container">
      <div slot="header">{{ date }} 订单</div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="订单号" width="160"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="140"
        ></el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type | tagType">
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90"
        ></el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="bottom-end"
              :content="scope.row.address"
              :open-delay="1000"
            >
              <div class="address">{{ scope.row.address }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" class-name="operation">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="primary" size="mini">
                订购详情<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(detail, index) in scope.row.details"
                  :key="index"
                >
                  <span class="detail-name"> {{ detail.food_name }} </span
                  >&nbsp;
                  <span class="detail-number">
                    {{ detail.number | numberFormat }}
                  </span>
                  <span class="el-dropdown-item-detail-price">
                    {{ detail.price | priceFormat }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span> 合计：</span>
                  <span class="el-dropdown-item-detail-total">
                    {{ scope.row.total | priceFormat }}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="danger" size="mini">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      background
      hide-on-single-page
      layout="prev, pager, next"
      :pager-count="5"
      :total="tableTotal"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getOdersByDateAndPagination } from "@/service/order";
import { dateFormat } from "@/utils/format";
export default {
  name: "OrderSearch",
  filters: {
    tagType(value) {
      if (value === "堂食") return "primary";
      else if (value === "打包") return "success";
      else return "danger";
    },
    numberFormat(val) {
      return "x" + val;
    },
    priceFormat(val) {
      return "￥" + val.toFixed(2);
    },
  },
  data() {
    return {
      date: "",
      tableData: [],
      tableTotal: 0,
      pageSize: 10,
      pageStart: 1,
      searchDate: "",
    };
  },
  async created() {
    const { orders, students, orderFoods, count } = (
      await this.searchOrder()
    ).data;
    orders.forEach((order) => {
      const student = students.find(
        (item) => item.student_id === order.student_id
      );
      const obj = {
        id: order.order_id,
        create_time: dateFormat(order.create_time),
        address: order.address,
        type: this.transformOrderType(order.order_type),
        name: student.name,
        address: student.address,
        phone: student.phone,
        status: this.tranformOrderStatus(order.status),
        details: orderFoods.find((item) => item.order_id === order.order_id)
          .food,
        total: order.price,
      };
      this.tableData.push(obj);
    });
    this.tableTotal = count;
    console.log(count);
  },
  methods: {
    async searchOrder() {
      const searchDate = this.searchDate;
      let date = null;
      let startTime, endTime, currentMonth;

      if (searchDate) {
        date = new Date(searchDate);
      } else {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth() + 1;

        date = new Date(`${year}-${month}`);
      }

      startTime = date.getTime();
      currentMonth = date.getMonth() + 1;

      if (currentMonth === 12) {
        endTime = new Date(`${date.getFullYear() + 1}-01`).getTime();
      } else {
        endTime = new Date(
          `${date.getFullYear()}-${currentMonth + 1}`
        ).getTime();
      }

      return await getOdersByDateAndPagination({
        startTime,
        endTime,
        pageStart: this.pageStart,
        pageSize: this.pageSize,
      });
    },
    transformOrderType(value) {
      switch (value) {
        case 0:
          return "堂食";
        case 1:
          return "打包";
        case 2:
          return "外卖";
      }
    },
    tranformOrderStatus(value) {
      switch (value) {
        case 0:
          return "未处理";
        case 1:
          return "已处理";
      }
    },
  },
};
</script>

<style lang="scss">
.orderSearch {
  .date-search {
    width: 90%;
    margin: 30px auto 0;

    .el-button {
      margin-left: 20px;
    }
  }

  .order-container {
    width: 90%;
    max-width: 1500px;
    margin: 30px auto 0;
  }

  .cell {
    cursor: default;
  }

  .address {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .operation .cell {
    display: flex;
    justify-content: space-around;
  }

  .el-pagination {
    margin-top: 60px;
    text-align: center;
  }
}
</style>
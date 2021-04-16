<template>
  <div class="userData">
    <div class="first-row">
      <el-card class="box-card data">
        <div slot="header" class="data-title">
          <span>用户流量</span>
          <el-tag type="primary" effect="dark" size="medium">2021-03</el-tag>
        </div>
        <div class="data-item">
          <span class="data-number">9560</span>
          <span class="data-description">用户量（总）</span>
        </div>
        <div class="data-item">
          <span class="data-number">650</span>
          <span class="data-description">注册量</span>
        </div>
        <div class="data-item">
          <span class="data-number">350</span>
          <span class="data-description">活跃用户</span>
        </div>
        <div class="data-item">
          <span class="data-number">3660</span>
          <span class="data-description">订单量</span>
        </div>
      </el-card>
      <el-tabs type="border-card" class="help">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-notebook-2"></i>
            菜单偏爱程度
          </span>
          <div class="foodPie">
            <EchartPie
              subtext="*仅显示本月销售量前6的菜品"
              :data="foodFovar"
              :show-legend="false"
              :show-tool-box="false"
              :index="0"
            ></EchartPie>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-time"></i>
            历史流量查询
          </span>
          <div class="date">
            <el-date-picker
              v-model="date"
              type="month"
              size="large"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="请输入需要查询的月份"
            >
            </el-date-picker>
            <div class="date-button">
              <el-button type="success" class="previous" @click="lastMonth"
                >上个月</el-button
              >
              <el-button type="primary" class="search">查询</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="second-row">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-s-custom"></i>
            用户增长量
          </span>
          <div class="userGrowth">
            <EchartBasic
              title="近半年的用户增长量"
              :index="0"
              :data="userGrowth"
            ></EchartBasic>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-s-data"></i>
            用户活跃情况
          </span>
          <div class="userActive">
            <EchartBasic
              item-color="#FF7070"
              title="近半年的活跃用户数"
              :index="1"
              :data="userActive"
            ></EchartBasic>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-s-order"></i>
            订单数量变化
          </span>
          <div class="orderNum">
            <EchartBasic
              title="近半年订单增长变化"
              type="bar"
              itemColor="#5C7BD9"
              :index="2"
              :data="orderNum"
            ></EchartBasic>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-menu"></i>
            订单类型分布
          </span>
          <div class="orderType">
            <EchartPie
              title="订单类型占比"
              subtext="2021-3"
              :data="orderType"
              :index="1"
            ></EchartPie>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import EchartPie from "@/components/echarts/EchartPie";
import EchartBasic from "@/components/echarts/EchartBasic";
export default {
  name: "UserData",
  components: {
    EchartPie,
    EchartBasic,
  },
  data() {
    return {
      date: "",
      foodFovar: [
        { value: 5000, name: "辣子鸡" },
        { value: 3000, name: "鲱鱼罐头" },
        { value: 3600, name: "王致和臭豆腐" },
        { value: 3600, name: "油麦菜" },
        { value: 3600, name: "麻婆豆腐" },
        { value: 3600, name: "香菇滑鸡" },
      ],
      userGrowth: [
        { month: "2021-1", value: 653 },
        { month: "2021-2", value: 800 },
        { month: "2021-3", value: 300 },
        { month: "2021-4", value: 0 },
        { month: "2021-5", value: 353 },
        { month: "2021-6", value: 753 },
      ],
      userActive: [
        { month: "2021-1", value: 888 },
        { month: "2021-2", value: 1200 },
        { month: "2021-3", value: 650 },
        { month: "2021-4", value: 352 },
        { month: "2021-5", value: 333 },
        { month: "2021-6", value: 753 },
      ],
      orderNum: [
        { month: "2021-1", value: 777 },
        { month: "2021-2", value: 1100 },
        { month: "2021-3", value: 980 },
        { month: "2021-4", value: 230 },
        { month: "2021-5", value: 650 },
        { month: "2021-6", value: 888 },
      ],
      orderType: [
        { value: 9500, name: "外卖" },
        { value: 2000, name: "堂食" },
        { value: 3600, name: "打包" },
      ],
    };
  },
  methods: {
    lastMonth() {
      this.$refs["lines"].repaint();
      this.$refs["pie"].repaint();
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/mixins.scss";
.userData {
  $btnW: 100px;
  $dataBoxW: 360px;
  $dataBoxItemW: $dataBoxW / 2 - 20px;
  $elMarginTop: 30px;

  .el-card__header {
    padding: {
      top: 12px;
      bottom: 12px;
    }
  }

  .el-tabs__item {
    height: 52px;
    span {
      line-height: 52px;
      font: {
        size: 16px;
        family: myFont3;
      }
      i {
        padding-right: 5px;
      }
    }
  }

  .first-row {
    margin: $elMarginTop auto 0;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }

  .second-row {
    width: 90%;
    margin: $elMarginTop auto 80px;

    .userGrowth,
    .userActive,
    .orderNum,
    .orderType {
      height: 500px;
      @include flex-center();
    }

    .el-tabs:last-child {
      margin-top: $elMarginTop;
    }
  }

  .data {
    width: $dataBoxW;
    min-width: $dataBoxW;
    .el-card__body {
      flex-wrap: wrap;
      width: 100%;
      box-sizing: border-box;
    }

    &-item {
      flex: 1;
      min-width: $dataBoxItemW;
    }

    .data-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font: {
        family: myFont2;
        size: 24px;
      }
    }
  }

  .data-item {
    @include flex-center(column);
    flex: 1;
    height: 120px;

    .data-number {
      color: #409eff;
      font: {
        size: 32px;
        family: myFont3;
      }
    }

    .data-description {
      margin-top: 15px;
      font: {
        size: 16px;
        family: myFont3;
      }
    }
  }

  .help {
    position: relative;
    width: 60%;
    min-width: 450px;
    max-width: 1000px;
  }

  .date {
    @include flex-center(column);
    margin-top: 80px;

    .el-input,
    &-button {
      width: 50%;
      min-width: 300px;
      max-width: 500px;
    }

    &-button {
      margin-top: 20px;

      .previous {
        width: $btnW;
      }

      .search {
        width: $btnW;
        margin-left: 20px;
      }
    }
  }

  .addExpend {
    @include flex-center(column);
    margin-top: 15px;

    .input-box > .el-input {
      width: 50%;
      min-width: 250px;
      max-width: 500px;
    }

    .el-select {
      width: 110px;
      margin-left: 20px;
    }
    .el-button {
      width: $btnW;
      margin-top: 20px;
    }
  }

  .foodPie > .echartPie {
    width: 46vw;
    height: 250px;
  }

  .echartBasic,
  .echartPie {
    width: 900px;
    height: 400px;
  }

  @media screen and (min-width: 1600px) {
    $dataBoxW: 440px;
    .data {
      width: $dataBoxW;
      min-width: $dataBoxW;
    }

    .second-row {
      .userGrowth,
      .userActive,
      .orderNum,
      .orderType {
        height: 550px;
      }
    }

    .echartBasic,
    .echartPie {
      width: 1200px;
      height: 500px;
    }
  }
}
</style>
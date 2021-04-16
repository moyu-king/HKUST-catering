<template>
  <div class="orderDeal" v-if="show">
    <template v-if="orders.length">
      <el-card
        class="order-item anim-up"
        shadow="hover"
        v-for="(item, index) in orders"
        :key="item.id"
      >
        <div slot="header" class="order-title">
          <span class="order-number">订单编号：&nbsp;{{ item.orderNum }}</span>
          <span>发起时间：&nbsp;{{ item.create_time }}</span>
        </div>
        <div class="order-info">
          <el-avatar :src="item.avatar" :size="50"></el-avatar>
          <div class="order-info-base">
            <div class="item">
              <i class="el-icon-user-solid"></i>
              收货人：{{ item.username }}
            </div>
            <div class="item">
              <i class="el-icon-phone"></i>
              手机号：{{ item.phone }}
            </div>
            <div class="item">
              <i class="el-icon-location"></i>
              收货地址：{{ item.address }}
            </div>
          </div>
        </div>
        <div class="buttonGroup">
          <span class="total">总额：{{ item.total | priceFormat }}</span>
          <el-dropdown :hide-on-click="false">
            <span class="details">明细<i class="el-icon-arrow-up"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="detail in item.details"
                :key="detail.name"
              >
                <span class="el-dropdown-item-detail-name">{{ detail.name }}</span>&nbsp;
                <span class="el-dropdown-item-detail-number">{{
                  detail.number | numberFormat
                }}</span>
                <span class="el-dropdown-item-detail-price">{{
                  detail.price | priceFormat
                }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" size="small" @click="accept(index, item.id)"
            >接单</el-button
          >
          <el-button type="warning" size="small" @click="reject(index, item.id)"
            >拒绝</el-button
          >
        </div>
      </el-card>
    </template>
    <p class="order-none" v-else>目前尚无订单信息</p>
  </div>
</template>

<script>
export default {
  name: "Order",
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    accept(index, id) {
      this.orders.splice(index, 1);
    },
    reject(index, id) {
      this.orders.splice(index, 1);
    },
  },
  filters: {
    numberFormat(val) {
      return "x" + val;
    },
    priceFormat(val) {
      return "￥" + val.toFixed(2);
    },
  },
};
</script>

<style lang="scss">
@keyframes up {
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.orderDeal {
  $cardH: 160px;
  $el-card__body_padding: 40px;

  width: 70%;
  max-width: 1200px;
  margin: 0 auto;

  .order-none {
    margin: 15vh auto 0;
    text-align: center;
    color: #7f8c8d;
    font: {
      family: myFont1;
      size: 24px;
    }
  }

  .order-title {
    display: flex;
    justify-content: space-between;
    font: {
      size: 14px;
      family: myFont1;
    }
  }

  .order-info {
    display: flex;
    align-items: center;
    font-family: myFont3;
  }

  .order-info-base {
    margin-left: 20px;
    .item:nth-child(1),
    .item:nth-child(2) {
      margin-bottom: 6px;
    }
  }

  .anim-up {
    animation: up 0.6s;
  }

  .el-card__body {
    position: relative;
    display: block;
    padding: {
      left: $el-card__body_padding;
      right: $el-card__body_padding;
    }
  }

  .el-card {
    margin-top: 30px;
  }

  .buttonGroup {
    margin-top: 10px;
    text-align: right;
    font-family: myFont3;

    .total {
      vertical-align: -4px;
      margin-right: 10px;
      color: #e74c3c;
      font-weight: 700;
    }

    .details {
      margin-right: 20px;
      vertical-align: -4px;
      color: #909399;
      cursor: pointer;
      i{
        transition: transform .5s;
      }
    }


    .details:hover i{
      transform: rotate(180deg);
    }

    .el-button {
      min-width: 80px;
      font-size: 12px;
    }
  }

  @media screen and (min-width: 1380px) {
    .el-card {
      height: $cardH;
    }
    .buttonGroup {
      position: absolute;
      bottom: 10px;
      right: $el-card__body_padding;
    }
  }
}
</style>
# 校园订餐系统

## 一、功能

### 1.用户

1. 堂食（扫码取餐）
2. 打包（+0.5 RMB）
3. *外卖（+2 RMB）
4. 查看菜式
5. 订单查看
6. 结算支付（购物车）
7. *充值
8. *优惠券
9. *客服

### 2.食堂管理员

1. 添加/删除/修改菜品信息

2. 查看流水（用户充值，暂不支持微信、支付宝）

3. 查看菜品销售情况（包括总额，份量）

4. 修改预定时间段/关门大吉

5. *订单发送（外卖）

6. *订单检索（外卖）

7. *发放优惠券

8. 修改打包费用和外卖费用

   

## 二、表结构

### 1.用户表

|                 Key                 |  Type  |   Range   |
| :---------------------------------: | :----: | :-------: |
|              password               | String |  [6,18]   |
|                name                 | String | unlimited |
|               stu_id                | Number |    12     |
|              portrait               | Array  | unlimited |
|                phone                | Number |    11     |
|               address               | String | unlimited |
|               wallet                | Number | unlimited |
| *discount(discount_id,num,get_time) | Arrary | unlimited |
|               pay_psw               | Number |     6     |

### 2.管理员表

|   Key    |  Type  |   Range   |
| :------: | :----: | :-------: |
|   name   | String | unlimited |
| password | String |  [6,18]   |
|  phone   | Number |    11     |
| portrait | String | unlimited |

### 3.订单表

|        Key        |         Type          |         Range          |
| :---------------: | :-------------------: | :--------------------: |
|      created      |       Timestamp       |       unlimited        |
|      stu_id       |        Number         |           12           |
|     discount      | Object(String,number) |       unlimited        |
| food(food_id,num) |         Array         |       unlimited        |
|       total       |        Number         |       unlimited        |
|      status       |        Boolean        |         [0,1]          |
|    order_type     |        String         | ["堂食","外卖","打包"] |
|      confirm      |        Boolean        |         [0,1]          |
|    admin_phone    |        Number         |           11           |

status:表示订单是否被处理

1. 堂食/打包：是否领取
2. 外卖：是否接单

### 4.菜品表

|   Key   |  Type   |      Range       |
| :-----: | :-----: | :--------------: |
| food_id | Number  |    unlimited     |
|  name   | String  |    unlimited     |
|  price  | Number  |    unlimited     |
|  image  | String  |    unlimited     |
|   num   | Number  | [0,100]/[0,50].. |
| status  | Boolean |      [0,1]       |

status:表示这道菜今天是否销售

### 5.优惠券表*

只有满减

|     Key     |  Type  |   Range   |
| :---------: | :----: | :-------: |
| discount_id | Number | unlimited |
|    title    | String | unlimited |
|    limit    | Number | unlimited |
|   reduce    | Number | unlimited |
|     num     | Number | unlimited |


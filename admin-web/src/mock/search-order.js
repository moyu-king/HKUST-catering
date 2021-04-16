import { mock } from 'mockjs'
import { API_BASE_URL } from '@/service'

mock(new RegExp(API_BASE_URL + '/order_search'), () => ({
  status: 1,
  message: 'ok',
  data: {
    orderTotal: 30,
    orders: [
      {
        id: "WM45671699464",
        creatime: "12:30:23",
        name: "卢姥爷",
        phone: 13907857195,
        status: "未完成",
        type: "外卖",
        address: "广西科技大学东环校区南区12栋209",
        total: 22,
        details: [
          { name: "猪肝粉肠", number: 2, price: 10 },
          { name: "包装费", number: 1, price: 1 },
          { name: "配送费", number: 1, price: 1 },
        ],
      },
      {
        id: "WM35711699464",
        creatime: "12:30:23",
        name: "莫尚坤",
        phone: 18776493825,
        status: "未完成",
        type: "堂食",
        address: "广西科技大学东环校区南区12栋202",
        total: 12,
        details: [
          { name: "猪肝粉肠", number: 1, price: 10 },
          { name: "包装费", number: 1, price: 1 },
          { name: "配送费", number: 1, price: 1 },
        ],
      },
      {
        id: "WM98741699464",
        creatime: "12:30:23",
        name: "王博年",
        phone: 15577506350,
        status: "已完成",
        type: "打包",
        address: "广西科技大学东环校区北区7栋301",
        total: 12,
        details: [
          { name: "猪肝粉肠", number: 1, price: 10 },
          { name: "包装费", number: 1, price: 1 },
          { name: "配送费", number: 1, price: 1 },
        ],
      },
      {
        id: "WM58231699464",
        creatime: "12:30:23",
        phone: 15347786094,
        name: "赖圣任",
        status: "已完成",
        type: "外卖",
        address: "广西科技大学东环校区北区7栋212",
        total: 12,
        details: [
          { name: "猪肝粉肠", number: 1, price: 10 },
          { name: "包装费", number: 1, price: 1 },
          { name: "配送费", number: 1, price: 1 },
        ],
      },
    ]
  }
}))
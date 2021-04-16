import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import("@/views/index/Index.vue");
const Login = () => import("@/views/login/Login.vue");
const OrderDeal = () => import("@/views/order/OrderDeal.vue");
const OrderSearch = () => import("@/views/order/OrderSearch.vue");
const AccountData = () => import("@/views/data/AccountData.vue");
const UserData = () => import("@/views/data/UserData.vue");
const ShopInfo = () => import("@/views/shop/ShopInfo.vue");
const ShopPass = () => import("@/views/shop/ShopPass.vue");
const ShopAvatar = () => import("@/views/shop/ShopAvatar.vue");
const AddFood = () => import("@/views/food/AddFood.vue");
const PutFood = () => import("@/views/food/PutFood.vue");
const UserMessage = () => import("@/views/message/UserMessage.vue");
const Discount = () => import("@/views/discount/Discount.vue");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: "后台系统"
    },
    children: [
      {
        path: "/",
        redirect: "order/deal"
      },
      {
        path: "order/deal",
        name: "OrderDeal",
        component: OrderDeal
      },
      {
        path: "order/search",
        name: "OrderSearch",
        component: OrderSearch
      },
      {
        path: "data/account",
        name: "AccountData",
        component: AccountData
      },
      {
        path: "data/user",
        name: "UserData",
        component: UserData
      },
      {
        path: "shop/info",
        name: "ShopInfo",
        component: ShopInfo
      },
      {
        path: "shop/pass",
        name: "ShopPass",
        component: ShopPass
      },
      {
        path: "shop/avatar",
        name: "ShopAvatar",
        component: ShopAvatar
      },
      {
        path: "food/add",
        name: "AddFood",
        component: AddFood,
      },
      {
        path: "food/put",
        name: "PutFood",
        component: PutFood
      },
      {
        path: "/message",
        name: "UserMessage",
        component: UserMessage
      },
      {
        path: "/discount",
        name: "Discount",
        component: Discount
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
})

export default router

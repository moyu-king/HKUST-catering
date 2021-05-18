import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("@/views/home");
const About = () => import("@/views/about");
const Profile = () => import("@/views/profile");
const Login = () => import("@/views/login")
const Register = () => import("@/views/register")
const Setting = () => import("@/views/setting")
const UserInfo = () => import("@/views/user-info")
const OrderFood = () => import("@/views/order-food")
const Payment = () => import("@/views/payment")
const Activity = () => import("@/views/activity")
const PaymentPassword = () => import("@/views/payment-password")
const Order = () => import("@/views/order")

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "关于"
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "我的"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "注册"
    }
  },
  {
    path: '/setting',
    name: "Setting",
    component: Setting,
    meta: {
      title: '设置'
    }
  },
  {
    path: '/user-info',
    name: 'UserInfo',
    component: UserInfo,
    meta: {
      title: '用户信息'
    }
  },
  {
    path: '/order-food',
    name: 'OrderFood',
    component: OrderFood,
    meta: {
      title: '餐饮预订'
    }
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    meta: {
      title: '支付'
    }
  },
  {
    path: '/activity',
    name: "Activity",
    component: Activity,
    meta: {
      title: '活动'
    }
  },
  {
    path: '/payment-password',
    name: "PaymentPassword",
    component: PaymentPassword,
    meta: {
      title: '支付密码'
    }
  },
  {
    path: '/order',
    name: "Order",
    component: Order,
    meta: {
      title: '订单'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

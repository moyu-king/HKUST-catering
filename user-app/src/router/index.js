import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Profile = () => import("@/views/Profile");

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
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'

})

export default router

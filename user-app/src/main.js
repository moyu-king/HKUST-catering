import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.use(Vant)


Vue.mixin({
  methods: {
    Undeveloped() {
      this.$toast({
        message: '未开放',
        icon: 'minus'
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

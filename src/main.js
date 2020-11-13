import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'


import '../public/mock/mockServer' // 引入加载模块



// 注册全局的过滤器
Vue.filter('date-string', function (value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

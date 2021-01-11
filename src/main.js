import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//事件总线   监听事件的
// $bus.$emit() 发送事件
//$bus.$on() 监听事件
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

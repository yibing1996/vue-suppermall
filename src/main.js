import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import toast from "components/common/toast"

import FastClick from 'fastclick'

Vue.config.productionTip = false

//事件总线   监听事件的
// $bus.$emit() 发送事件
//$bus.$on() 监听事件
Vue.prototype.$bus = new Vue()

//安装插件
//会默认调用这个插件的install
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

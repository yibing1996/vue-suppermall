import Toast from './Toast'


const obj = {}

obj.install = function (Vue) {
  console.log('插件install');
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2.根据组件构造器 创建一个vue对象
  const toast = new toastContrustor()
  //3.将组件对象手动挂在到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  //1-4只是为了将组件一开始加载到页面中
  Vue.prototype.$toast = toast
}

export default obj
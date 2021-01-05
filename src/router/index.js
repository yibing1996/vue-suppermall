import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=> import('views/home/Home')
const Cart = ()=>import('views/cart/Cart')
const CateGory = ()=> import('views/category/CateGory')
const Profile = ()=>import('views/profile/Profile')

//使用路由
Vue.use(VueRouter)


const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:CateGory
  },
  {
    path:'/profile',
    component:Profile
  },
]

const router = new VueRouter({
  routes,
  mode:'history'
})


export default router
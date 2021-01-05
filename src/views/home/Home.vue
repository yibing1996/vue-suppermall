<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <HomeSwiper :banners="banners"></HomeSwiper>
  </div>
</template>


<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childcompoents/HomeSwiper";

  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components:{
      //顶层导航栏
      NavBar,
      HomeSwiper
    },
    data(){
      return{
          banners:[],
          recommends:[]
      }
    },
  //  当组件创建出来就去请求数据
    created() {
      getHomeMultidata().then(res =>{
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })
    }
  }
</script>



<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
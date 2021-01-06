<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommond :recommends="recommends"></home-recommond>
    <home-feature></home-feature>

  </div>
</template>


<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childcompoents/HomeSwiper";
  import HomeRecommond from "./childcompoents/HomeRecommond";
  import HomeFeature from "./childcompoents/HomeFeature";

  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components:{
      //顶层导航栏
      NavBar,
      HomeSwiper,
      HomeRecommond,
      HomeFeature
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
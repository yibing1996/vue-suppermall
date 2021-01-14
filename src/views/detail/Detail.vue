<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :banners="banners"></detail-swiper>
    <detail-base-info :goods="goodsinfo"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from './childcomponents/DetailNavBar';
  import DetailSwiper from './childcomponents/DetailSwiper'
  import DetailBaseInfo from './childcomponents/DetailBaseInfo'

  import {getdetaildata,GoodsInfo} from "network/detail";

  export default {
    name: "Detail",
    data(){
      return{
        goodid:null,
        banners:[],
        goodsinfo:{}
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    created() {
      //获取本次商品的id
      this.goodid = this.$route.params.goodid
      //每次组件创建的时候获取相应商品的详情信息
      getdetaildata(this.goodid).then(res=>{
        console.log(res);
        //获取轮播图数据
        this.banners = res.result.itemInfo.topImages
        //获取商品信息
        this.goodsinfo = new GoodsInfo(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        //获取商家信息

      })
    }
  }
</script>

<style scoped>

</style>
<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :banners="banners"></detail-swiper>
    <detail-base-info :goods="goodsinfo"></detail-base-info>
    <detail-shop-info :shop="shopinfo"></detail-shop-info>
  </div>
</template>

<script>
  import DetailNavBar from './childcomponents/DetailNavBar';
  import DetailSwiper from './childcomponents/DetailSwiper'
  import DetailBaseInfo from './childcomponents/DetailBaseInfo'
  import DetailShopInfo from './childcomponents/DetailShopInfo'

  import {getdetaildata,GoodsInfo,ShopInfo} from "network/detail";

  export default {
    name: "Detail",
    data(){
      return{
        goodid:null,
        banners:[],
        goodsinfo:{},
        shopinfo:{}
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    created() {
      //获取本次商品的id
      this.goodid = this.$route.params.goodid
      //每次组件创建的时候获取相应商品的详情信息
      getdetaildata(this.goodid).then(res=>{
        const data = res.result
        console.log(data);
        //获取轮播图数据
        this.banners = data.itemInfo.topImages
        //获取商品信息
        this.goodsinfo = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
        //获取商家信息
        this.shopinfo = new ShopInfo(data.shopInfo)

      })
    }
  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
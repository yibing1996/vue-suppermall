<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :goods="goodsinfo"></detail-base-info>
      <detail-shop-info :shop="shopinfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailinfo" @detailimageload="detailimageload"></detail-goods-info>
      <detail-params-info :paraminfo="goodsparams"></detail-params-info>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/bscroll/Bscroll'
  import DetailNavBar from './childcomponents/DetailNavBar';
  import DetailSwiper from './childcomponents/DetailSwiper'
  import DetailBaseInfo from './childcomponents/DetailBaseInfo'
  import DetailShopInfo from './childcomponents/DetailShopInfo'
  import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
  import DetailParamsInfo from "./childcomponents/DetailParamsInfo";

  import {getdetaildata,GoodsInfo,ShopInfo,GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    data(){
      return{
        goodid:null,
        banners:[],
        goodsinfo:{},
        shopinfo:{},
        detailinfo:{},
        goodsparams:{}
      }
    },
    components:{
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo
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
        //获取商品详情的一些信息和图片
        this.detailinfo = data.detailInfo
        //获取商品的参数信息
        this.goodsparams = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      })
    },
    methods:{
      detailimageload(){
        // console.log('---');
        this.$refs.scroll && this.$refs.scroll.refresh()
      }
    },
    mounted() {
      //轮播图加载完成之后重新计算可滚动高度
      this.$bus.$on('detailswiperload',()=>{
        this.$refs.scroll && this.$refs.scroll.refresh()
      })
    }
  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
  .detail-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
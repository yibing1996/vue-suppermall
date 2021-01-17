<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :goods="goodsinfo"></detail-base-info>
      <detail-shop-info :shop="shopinfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailinfo" @detailimageload="detailimageload"></detail-goods-info>
      <detail-params-info :paraminfo="goodsparams"></detail-params-info>
      <detail-comment-info :comment="comment"></detail-comment-info>
      <detail-recommond-info :recommond="recommond"></detail-recommond-info>
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
  import DetailCommentInfo from "./childcomponents/DetailCommentInfo"
  import DetailRecommondInfo from "./childcomponents/DetailRecommondInfo";

  import {getdetaildata,GoodsInfo,ShopInfo,GoodsParam,getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenImage} from "common/mixin"

  export default {
    name: "Detail",
    data(){
      return{
        goodid:null,
        banners:[],
        goodsinfo:{},
        shopinfo:{},
        detailinfo:{},
        goodsparams:{},
        comment:{},
        recommond:[],
        // itemlisten:null
      }
    },
    components:{
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailRecommondInfo
    },
    created() {
      //获取本次商品的id
      this.goodid = this.$route.params.goodid
      //每次组件创建的时候获取相应商品的详情信息
      getdetaildata(this.goodid).then(res=>{
        const data = res.result
        // console.log(data);
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
        //获取商品的品论信息
        if(data.rate)
        {
          this.comment = data.rate.list[0]
        }


      })
      //获取更多推荐
      getRecommend().then(res=>{
        this.recommond = res.data.list
        // console.log(this.recommond)
      })

    },
    methods:{
      detailimageload(){
        // console.log('---');
        this.$refs.scroll && this.$refs.scroll.refresh()
      },
    },
    //混入: 会把混入里面 data  或者各种生命周期里的内容加到本次组件里
    mixins:[itemListenImage],
    mounted() {
      //轮播图加载完成之后重新计算可滚动高度
      // this.$bus.$on('detailswiperload',()=>{
      //   this.$refs.scroll && this.$refs.scroll.refresh()
      // })

      // //1. 防抖动处理    每加载一次图片重新计算高度
      // const refresh = debounce(this.$refs.scroll.refresh,100)
      // this.itemlisten = ()=> {
      //   refresh()
      // }
      // //监听事件总线事件
      // this.$bus.$on('imageitemload', this.itemlisten)
      // this.$refs && this.$refs.scroll && this.$refs.scroll.refresh()
    },
    destroyed() {
      // console.log('detaildestroyed');
      //组件销毁的时候就不监听这个事件了
      this.$bus.$off('imageitemload',this.itemlisten)
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
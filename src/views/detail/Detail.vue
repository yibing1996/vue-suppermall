<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar"
                    @centeritemclick="centeritemclick"
                    ref="detailbar"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="scroll">
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :goods="goodsinfo"></detail-base-info>
      <detail-shop-info :shop="shopinfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailinfo" @detailimageload="detailimageload"></detail-goods-info>
      <detail-params-info :paraminfo="goodsparams" ref="params"></detail-params-info>
      <detail-comment-info :comment="comment" ref="comment"></detail-comment-info>
      <detail-recommond-info :recommond="recommond" ref="recommend"></detail-recommond-info>
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addcart="addcart"></detail-bottom-bar>
    <back-top @click.native="backtopclick" v-show="isshowbacktop"></back-top>
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
  import DetailBottomBar from "./childcomponents/DetailBottomBar"
  import BackTop from 'components/content/backtop/BackTop'

  import {getdetaildata,GoodsInfo,ShopInfo,GoodsParam,getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenImage} from "common/mixin"

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    data() {
      return {
        goodid: null,
        banners: [],
        goodsinfo: {},
        shopinfo: {},
        detailinfo: {},
        goodsparams: {},
        comment: {},
        recommond: [],
        // itemlisten:null   用了混入  所以注释掉
        themeTopy: [],
        themescroll: null,
        isshowbacktop: false,
      }
    },
    components: {
      Scroll,

      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailRecommondInfo,
      DetailBottomBar,
      BackTop
    },
    created() {
      //获取本次商品的id
      this.goodid = this.$route.params.goodid
      //每次组件创建的时候获取相应商品的详情信息
      getdetaildata(this.goodid).then(res => {
        const data = res.result
        // console.log(data);
        //获取轮播图数据
        this.banners = data.itemInfo.topImages
        //获取商品信息
        this.goodsinfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        //获取商家信息
        this.shopinfo = new ShopInfo(data.shopInfo)
        //获取商品详情的一些信息和图片
        this.detailinfo = data.detailInfo
        //获取商品的参数信息
        this.goodsparams = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //获取商品的品论信息
        if (data.rate) {
          this.comment = data.rate.list[0]
        }

        //子组件还没有渲染完
        // this.themeTopy = []
        // this.themeTopy.push(0)
        // this.themeTopy.push(this.$refs.params.$el.offsetTop)
        // this.themeTopy.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopy.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopy);
        //子组件里的节点渲染玩了 但是图片没有加载完
        // this.$nextTick(()=>{
        //   this.themeTopy = []
        //   this.themeTopy.push(0)
        //   this.themeTopy.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopy.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopy.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopy);
        // })

      })
      //获取更多推荐
      getRecommend().then(res => {
        this.recommond = res.data.list
        // console.log(this.recommond)
      })

      // 用防抖封装一下频繁获取 offsetTop
      this.themescroll = debounce(() => {
        this.themeTopy = []
        this.themeTopy.push(0)
        this.themeTopy.push(this.$refs.params.$el.offsetTop)
        this.themeTopy.push(this.$refs.comment.$el.offsetTop)
        this.themeTopy.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopy.push(Number.MAX_VALUE)
        // console.log(this.themeTopy);
      }, 100)
    },
    methods: {
      //将vuex里面的actions注入到这个方法里
      ...mapActions(['addShop']),

      //商品的图片加载后重新计算scroll的高度
      detailimageload() {
        // console.log('---');
        // this.$refs.scroll && this.$refs.scroll.refresh()
        //混入里的内容  加了防抖还
        this.refresh()
        //保存 商品 参数 评论 推荐 对应的offsetTop
        this.themescroll()
        //在created里用防抖封装一下
        // this.themeTopy = []
        // this.themeTopy.push(0)
        // this.themeTopy.push(this.$refs.params.$el.offsetTop)
        // this.themeTopy.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopy.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopy);
      },
      //点击按钮可以回到对应的位置上 商品 参数 评论 推荐
      centeritemclick(index) {
        // console.log(index);
        if (this.themeTopy[index] !== 0) {
          this.$refs.scroll.scrollTo(0, -this.themeTopy[index] + 44, 300)
        } else {
          this.$refs.scroll.scrollTo(0, -this.themeTopy[index], 300)
        }

      },
      //监听滚动  并滚动到一定位置 切换 商品 参数 评论 推荐
      scroll(position) {
        // console.log(position);
        let scrollY = -position.y
        // [0, 13874, 15156, 15405, 1.7976931348623157e+308,]
        for (let i = 0; i < this.themeTopy.length - 1; i++) {
          if (scrollY >= this.themeTopy[i] - 44 && scrollY < this.themeTopy[i + 1] - 44) {
            //避免重复给this.$refs.detailbar.currentindex赋值
            if (this.$refs.detailbar.currentindex !== i) {
              // console.log(i);
              this.$refs.detailbar.currentindex = i
            }

          }


        }

        //是否隐藏返回顶部按钮
        this.isshowbacktop = -position.y > 1000
      },
      //返回顶部按钮
      backtopclick() {
        // console.log('backtopclick');
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      //加入购物车
      addcart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.goodid;
        obj.imgURL = this.banners[0]
        obj.title = this.goodsinfo.title
        obj.desc = this.goodsinfo.desc;
        obj.newPrice = this.goodsinfo.realPrice;
        // 3.添加到Store中
        // this.$store.commit('addCart',obj)   //这是用mutations来直接增加的  为了能监控vuex  是增加新商品还是在已有的商品上+1，我们用actions
        // this.$store.dispatch('addShop', obj).then(res => {
        //   console.log(res);
        // })
        //   //用vuex里的actions方法
          this.addShop(obj).then(res=>{
              console.log(res);
              //显示加入toast
              this.$toast.show(res,1000)
        })
      }
    },

    //混入: 会把混入里面 data  或者各种生命周期里的内容加到本次组件里
    mixins: [itemListenImage],
    mounted() {
      //轮播图加载完成之后重新计算可滚动高度
      this.$bus.$on('detailswiperload', () => {
        this.$refs.scroll && this.$refs.scroll.refresh()
      })
      //这里用了混入  所以注释掉了
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
      this.$bus.$off('imageitemload', this.itemlisten)
    },
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
    height: calc(100% - 44px - 49px);
  }


</style>
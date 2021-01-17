<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :contents="['流行','新款','精选']"
                 class="tab-control1"
                 @tabitemclick="tabitemclick"
                 ref="tabcontrol1"
                  v-show="isshowtabcontrol1"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp="contentloadmore">
      <home-swiper :banners="banners" @homeswiperload="homeswiperload"></home-swiper>
      <home-recommond :recommends="recommends"></home-recommond>
      <home-feature></home-feature>
      <tab-control :contents="['流行','新款','精选']"
                   class="tab-control2"
                   @tabitemclick="tabitemclick"
                    ref="tabcontrol2"></tab-control>
      <goods-list :goods="goods[currentgood].list"></goods-list>
    </scroll>
    <back-top @click.native="backtopclick" v-show="isshowbacktop"></back-top>
  </div>
</template>


<script>
  import HomeSwiper from "./childcompoents/HomeSwiper";
  import HomeRecommond from "./childcompoents/HomeRecommond";
  import HomeFeature from "./childcompoents/HomeFeature";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import scroll from "components/common/bscroll/Bscroll"
  import BackTop from 'components/content/backtop/BackTop'

  import {getHomeMultidata, getHomeData} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenImage} from 'common/mixin'

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      HomeRecommond,
      HomeFeature,

      NavBar,
      TabControl,
      GoodsList,
      scroll,
      BackTop
    },
    data(){
      return{
          banners:[],
          recommends:[],
          goods:{
            pop:{page:0, list:[]},
            new:{page:0, list:[]},
            sell:{page:0, list:[]},
          },
        currentgood:'pop',
        isshowbacktop:false,
        taboffsettop:0,
        isshowtabcontrol1:false,
        scrollY:0,
        // itemlisten:null
      }
    },
  //  当组件创建出来就去请求数据
    created() {
      this.getHomeMultidata()
      //请求流行数据
      this.getHomeData('pop')
      //请求新品数据
      this.getHomeData('new')
      //请求精选数据
      this.getHomeData('sell')

    },
    //混入: 会把混入里面 data  或者各种生命周期里的内容加到本次组件里
    mixins:[itemListenImage],
    //组件加载完成后执行
    mounted() {
      // //1. 防抖动处理    每加载一次图片重新计算高度
      // const refresh = debounce(this.$refs.scroll.refresh,100)
      // this.itemlisten = ()=> {
      //   refresh()
      // }
      // //监听事件总线事件
      // //监听事件总线事件
      // this.$bus.$on('imageitemload', this.itemlisten)
      // this.$refs && this.$refs.scroll && this.$refs.scroll.refresh()

    },
    methods:{
      /**
       *事件监听相关
       */
      //记录当前点击了那个品牌的按钮
      tabitemclick(index){
        switch (index) {
          case 0:
            this.currentgood = 'pop'
            break
          case 1:
            this.currentgood = 'new'
            break
          case 2:
            this.currentgood = 'sell'
            break
        }
        //两个tabcontrol被选中的被保持一直
        this.$refs.tabcontrol1.currentindex = index
        this.$refs.tabcontrol2.currentindex = index
        // console.log(this.$refs.tabcontrol1 )
      },
      //返回顶部按钮
      backtopclick(){
        // console.log('backtopclick');
        this.$refs.scroll.scrollTo(0,0,500)
      },

      contentscroll(position){
        //是否隐藏返回顶部按钮
          this.isshowbacktop = -position.y > 1000
        //是否隐藏tabcontrol1
         this.isshowtabcontrol1 = -position.y > this.taboffsettop
      },
      //到底部加载更多图片
      contentloadmore(){
        // console.log('加载到底部');
        this.getHomeData(this.currentgood)
        this.$refs.scroll.finishPullUp()
      },
      //轮播图加载完毕 计算tabcontrol的offsettop的距离
      homeswiperload(){
        //2.获取tabcontrol的offsetTop(获取组件的offsetTop)
        // console.log(this.$refs.tabcontrol2.$el.offsetTop);
        this.taboffsettop = this.$refs.tabcontrol2.$el.offsetTop

      },

      /**
       * 网络请求相关
       */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      },
      getHomeData(type){
        //在当前页上+1
        let page = this.goods[type].page + 1
        getHomeData(type,page).then(res =>{
          //请求的数据保存起来
          this.goods[type].list.push(...res.data.list)
          //在请求一页数据后页数也相应的+1
          this.goods[type].page+=1
        })
      }

    },

    //组件被销毁的时候使用  用了keep-alive后就不会被销毁
    destroyed() {
      console.log('home-destroyed');
    },
    //用了  keep-alive 在当前组件时是活跃状态
    activated() {
      // console.log('home-activated');
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.scrollY,0)
    },
    //用了  keep-alive 在不是当前组件时是非活跃状态
    deactivated() {
      // console.log('home-deactivated');
      this.scrollY = this.$refs.scroll.getScrollY()
      //组件不活跃的时候就不监听这个事件了
      this.$bus.$off('imageitemload',this.itemlisten)
      // console.log(this.scrollY)
    }
  }
</script>



<style scoped>
  #home {
    height: 100vh;
    position: relative;
    /*padding-top: 44px;*/

  }

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*z-index: 9;*/
}

  .tab-control2 {
    /*position: sticky;*/
    /*position: -webkit-sticky;*/
    /*top:44px;*/
    background-color: #fff;
    /*z-index: 9;*/
  }

  .tab-control1 {
    position: fixed;
    left:0;
    right: 0;
    top:43px;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom:49px;
    left: 0;
    right: 0;
  }
</style>
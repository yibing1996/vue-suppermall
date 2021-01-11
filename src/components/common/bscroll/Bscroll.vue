<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Bscroll",
    data(){
      return {
        scroll:null
      }
    },
    props:{
      probeType:{
        type: Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad,
        click:true,
      })

      //监听滚动位置
      //加if原因: 当probeType为0但是pullUpLoad为true的时候也会触发scroll事件
      if(this.probeType===2 || this.probeType===3){
        this.scroll.on('scroll',position=>{
          // console.log(position)
          this.$emit('scroll',position)
        })
      }

      //监听滚动到底部
      //加if原因：当pullUpLoad为false的时候监听pullingUp事件会报错
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('滚动到底部');
          // this.scroll.finishPullUp()
          this.$emit('pullingUp')
        })
      }

      // console.log(this.scroll);
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      //执行完上拉加载更多功能后在执行此方法,可以执行下一次上拉加载更多
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      //重新计算可滚动高度
      refresh(){
        // console.log('---');
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
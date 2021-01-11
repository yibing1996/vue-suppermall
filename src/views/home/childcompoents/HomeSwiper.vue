<template>
  <div>
    <Swiper>
      <SwiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image923" alt="" @load="homeswiperload">
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper/index"
  export default {
    name: "HomeSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    data(){
      return {
        isload:false
      }
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      //图片加载完毕
      homeswiperload() {
        if(!this.isload){
          // console.log('图片加载完毕');
          this.isload = true
          this.$emit('homeswiperload')
        }

      }
    }
  }
</script>

<style scoped>

</style>
<template>
    <Swiper class="detail-swiper">
      <SwiperItem v-for="item in banners" class="banneritem">
        <img :src="item" alt="" @load="detailswiperload">
      </SwiperItem>
    </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isimgload:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      detailswiperload(){
        if(!this.isimgload){
          this.$bus.$emit('detailswiperload')
          this.isimgload = true
        }

      }
    }
  }
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
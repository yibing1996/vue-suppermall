<template>
    <Swiper class="detail-swiper">
      <SwiperItem v-for="item in banners" class="banneritem">
        <img :src="item" alt="">
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
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
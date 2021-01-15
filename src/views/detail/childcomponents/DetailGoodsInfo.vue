<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !==0">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img  v-for="(item,index) in detailInfo.detailImage[0].list" :src="item" alt="" :key="index" @load="detailimageload">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props:{
      detailInfo:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        counter:0,
        imagesLengh:0
      }
    },
    methods:{
      detailimageload(){
        //只有当所有的图片都加载完成的时候才抛出图片加载完这个事件
        if(++this.counter===this.imagesLengh){
          this.$emit('detailimageload')
        }

      }
    },
    //监听某个变量的变化
    watch:{
      detailInfo(){
        //获取图片的个数
        this.imagesLengh = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    font-size: 14px;
    color: #333;
  }

  .info-list img {
    width: 100%;
  }

</style>
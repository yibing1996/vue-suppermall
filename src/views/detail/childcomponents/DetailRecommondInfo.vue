<template>
  <div class="recommend-info" v-if="Object.keys(recommond)!==0">
    <div class="info-header">热门推荐</div>
    <goods-list :goods="recommond"></goods-list>
  </div>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";
  export default {
    name: "DetailRecommondInfo",
    props:{
      recommond:{
        type:Array,
        return: []
      }
    },
    components:{
      GoodsList
    }
  }
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
<template>
  <div class="goods-item" @click="itemclick">
    <img :src="gooditem.show.img" alt="" @load="gooditemload">
    <div class="goods-info">
      <p>{{gooditem.title}}</p>
      <span class="price">{{gooditem.price}}</span>
      <span class="collect">{{gooditem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      gooditem:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      //图片加载完
      gooditemload(){
        // console.log('imgonload');
        //发送事件总线事件
        this.$bus.$emit('imageitemload')
      },
      //点击跳转到详情页
      itemclick(){
        this.$router.push('/detail/'+this.gooditem.iid)
      }
    }
  }
</script>

<style scoped>
.goods-item {
  width: 48%;
  padding-bottom: 20px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

  .goods-info {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
  }

.goods-info p {
  margin-bottom: 3px;
}

  .goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    /* 0 0 代表background-position 不是精灵图就用0即可*/
    /* /后面是大小 即background-size  14px 14px  如果两个一样又可以简写*/
    background: url("~assets/img/common/collect.svg" )  0 0/14px 14px;
  }
</style>
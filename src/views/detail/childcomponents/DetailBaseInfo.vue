<template>
  <div v-if="Object.keys(goods).length !==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length-1" v-if="goods.services[index-1].icon && goods.services[index-1].name" class="info-service-item" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default:{}
      }
    }
  }
</script>


<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
  .info-title {
    color: #222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 10px;
    text-decoration: line-through;
  }

  .info-price .discount {
    margin-left: 5px;
    font-size: 12px;
    background-color: var(--color-high-text);
    color:#fff;
    padding: 2px 5px;
    border-radius: 8px;
  /*  如果让元素上浮一些  相对定位即可*/
    position: relative;
    top:-8px
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    /*height: 30px;*/
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

.info-other span {
  flex: 1;
}

  .info-service {
    display: flex;
    line-height: 60px;
  }

  .info-service .info-service-item {
    flex: 1;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top:2px;
  }

.info-service-item span {
  font-size: 13px;
  color: #333;
}

</style>
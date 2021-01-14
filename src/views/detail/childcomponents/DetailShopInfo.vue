<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
       <div class="shop-middle-item shop-middle-left">
         <div class="info-sells">
           <div class="sells-count">
             {{shop.sells | sellCountFilter}}
           </div>
           <div class="sells-text">总销量</div>
         </div>
          <div class="info-goods">
            <div class="goods-count">
              {{shop.goodsCount}}
            </div>
            <div class="goods-text">全部宝贝</div>
          </div>
       </div>
      <div class="shop-middle-item shop-middle-right" >
        <ul>
          <li v-for="(item,index) in shop.score" :key="index">
            <span>{{item.name}}</span>
            <span class="score" :class="{'score-better':item.isBetter}">{{item.score}}</span>
            <span class="better" :class="{'better-more':item.isBetter}">{{item.isBetter ? '高' : '低'}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props:{
      shop:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters: {
      sellCountFilter:function (value) {
        if(value<10000) return value
        return (value/10000).toFixed(1)+'万'
      }
    }
  }
</script>

<style scoped>
  .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top {
    /*line-height: 45px;*/
    height: 45px;
  /*  让元素垂直盒子的中心对齐  因为设置了盒子的高度*/
    display: flex;
    align-items: center;
  }

  .shop-top img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }

  .shop-top .title {
    margin-left: 10px;
    vertical-align: middle;
  }

  .shop-middle {
    margin-top: 15px;
    display: flex;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-around;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1)
  }

  .sells-count, .goods-count {
    font-size: 18px;
    height:24px;
    line-height: 24px;
  }

  .sells-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }

  .shop-middle-right {
    font-size: 13px;
    color: #333;
  }

  .shop-middle-right ul {
    width: 120px;
    margin-left: 30px;

  }

  .shop-middle-right ul li{
    padding-bottom: 10px;
    /*margin: 5px 4px;*/
    display: flex;
    justify-content:space-between
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more {
    background-color: #f13e3a;
    color: #fff;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }


</style>
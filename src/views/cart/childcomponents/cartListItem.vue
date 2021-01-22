<template>
  <div id="shop-item">
    <div class="item-selector" @click="itemselectorclick">
      <check-button :is-checked="ischecked"></check-button>
    </div>
    <div class="item-image">
      <img :src="itemInfo.imgURL" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述:{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.newPrice}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  export default {
    name: "cartListItem",
    props:{
      itemInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
      }
    },
    computed:{
      ischecked(){
        return this.itemInfo.isselect
      }
    },
    components:{
      CheckButton
    },
    methods:{
      itemselectorclick(){
        this.itemInfo.isselect = !this.itemInfo.isselect
        //进行重新赋值的原因是在html那部分直接获取 itemInfo.isselect有点问题
        // this.ischecked = this.itemInfo.isselect
        // console.log('---');
        // console.log(this.ischecked);
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    display: flex;
    /*background-color: pink;*/
    width: 14%;
    justify-content: center;
    align-items: center;
  }


  .item-image{
    padding: 5px;
    display: inline-block;
  }

  .item-image img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
    display: block;
  }


  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }



  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
<template>
  <div class="bottom-menu">
    <check-button class="select-all" :is-checked="isSelectAll" @click.native="checkbuttonclick"></check-button>
    <span>全选</span>
    <span class="total-price">合计:￥{{ totalPrice }}</span>
    <span class="buy-product" @click="buyclick">去计算({{ totalCount }})</span>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  export default {
    name: "cartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return this.$store.getters.cartList.filter(item => item.isselect).reduce((total,item)=>{
          return total+ item.count * item.newPrice
        },0).toFixed(2)
      },
      totalCount(){
        return this.$store.getters.cartList.filter(item => item.isselect).reduce((total,item)=>{
          return total+ item.count
        },0)
      },
      isSelectAll(){
        if(this.$store.getters.cartList.length===0) return false
        //被选中的数量和总数量相等
        return this.$store.getters.cartList.filter(item=>item.isselect).length===this.$store.getters.cartList.length
      }
    },
    methods:{
      checkbuttonclick(){
        //全选状态时  就改为全不选
        if(this.isSelectAll){
          this.$store.getters.cartList.forEach(item=>item.isselect=false)
        }
        else {
          //如果 有未选中的改为全选
          this.$store.getters.cartList.forEach(item=>item.isselect=true)
        }
      },
      buyclick(){
        if(!this.totalCount){
          this.$toast.show('请先选择购买的商品',1000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    height: 30px;
    background-color: #eee;
    position: relative;
    bottom: 6px;
    display: flex;
    align-items: center;
  }

  .bottom-menu .select-all {
    margin-left: 10px;
    margin-right: 6px;
  }

  .bottom-menu .total-price {
    flex: 1;
    margin-left: 20px;
    color: #666;
  }

  .bottom-menu .buy-product {
    width: 80px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }


</style>
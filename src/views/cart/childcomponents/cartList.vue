<template>
  <div class="cart-list-info">
    <cart-list-item v-for="(item,index) in goodsList" :item-info="item"></cart-list-item>
  </div>
</template>

<script>
  import cartListItem from "./cartListItem";
  export default {
    name: "cartList",
    components:{
      cartListItem
    },
    props:{
      goodsList:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
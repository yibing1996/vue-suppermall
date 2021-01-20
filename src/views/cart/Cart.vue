<template>
  <nav-bar class="cart-nav-bar">
    <div slot="center">购物车({{shopcount}})</div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "Cart",
    components:{
      NavBar
    },
    computed:{
      shopcount(){
        // return this.$store.state.cratList.length
        return this.$store.getters.cartCount
      }
    }
  }
</script>

<style scoped>
  .cart-nav-bar {
    background-color: var(--color-tint);
    font-size: 16px;
    color: #fff;
  }
</style>
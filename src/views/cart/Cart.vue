<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <scroll class="car-content" ref="scroll">
      <cart-list :goods-list="$store.getters.cartList"></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import scroll from "components/common/bscroll/Bscroll"

  import cartList from "./childcomponents/cartList";
  import cartBottomBar from "./childcomponents/cartBottomBar";

  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      scroll,
      cartList,
      cartBottomBar
    },
    computed:{
      // cartCount(){
      //   // return this.$store.state.cratList.length
      //   return this.$store.getters.cartCount
      // }
      //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
      //mapGetters用法1
      // ...mapGetters(['cartCount','cartList'])
      //mapGetters用法2
      ...mapGetters({
        cartCount:'cartCount',
        cartList:'cartList'
      })
    },
    activated() {
      this.$refs.scroll && this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }
  .cart-nav-bar {
    background-color: var(--color-tint);
    font-size: 16px;
    color: #fff;
  }

  .car-content {
    height: calc(100% - 44px - 44px - 30px);
    position: relative;
    overflow: hidden;
  }
</style>
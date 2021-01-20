export default {
  cartList(state) {
    return state.cratList
  },
  cartCount(state, getters) {
    return getters.cartList.length
  }
}
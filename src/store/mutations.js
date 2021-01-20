export default {
  // addCart(state,payload) {
  //
  //   let oldproduct = state.cratList.find((item)=>{
  //     return item.iid === payload.iid
  //   })
  //   //如果购物车没有这个商品  就新增加一个商品同时增加字段 count为1，有的话就把这个商品的数量+1
  //   if(oldproduct){
  //     oldproduct.count +=1
  //   }
  //   else{
  //     payload.count = 1
  //     state.cratList.push(payload)
  //   }
  //
  // },
  add_new_shop(state,payload){
    state.cratList.push(payload)
  },
  add_old_shop(state,payload){
    payload.count +=1
  }
}
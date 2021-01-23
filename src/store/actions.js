export default {

  addShop(context,payload){
    return new Promise((resolve,reject)=>{
      //context是上下文
      //数组的find方法  里面是一个函数  返回为true的元素
      let oldproduct = context.state.cratList.find((item)=>{
        return item.iid === payload.iid
      })

      if(oldproduct){
        //购物车有这个商品 执行商品数量+1
        context.commit('add_old_shop',oldproduct)
        resolve('商品数量+1')
      }
      else {
        //购物车没有这个商品  执行 把商品加入到cratList 同时加上count=1
        payload.count=1
        payload.isselect = false
        context.commit('add_new_shop',payload)
        resolve('添加新的商品成功')
      }
    })

  }
}
import {debounce} from "./utils";

export const itemListenImage = {
  data(){
    return {
      itemlisten:null
    }
  },
  mounted(){
    //1. 防抖动处理    每加载一次图片重新计算高度
    const refresh = debounce(this.$refs.scroll.refresh,100)
    this.itemlisten = ()=> {
      refresh()
    }
    //监听事件总线事件
    this.$bus.$on('imageitemload', this.itemlisten)
    this.$refs && this.$refs.scroll && this.$refs.scroll.refresh()
    console.log('我是混入内容');
  }

}
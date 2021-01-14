<template>
  <div class="detail-nav-bar">
    <nav-bar>
        <div class="left" slot="left" @click="leftclick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      <div class="center" slot="center">
          <div v-for="(item,index) in title"
               class="centeritem"
               :class="{active:currentindex===index}"
               @click="centeritemclick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        title:['商品','参数','评论','推荐'],
        currentindex:0
      }
    },
    methods:{
      //点击返回
      leftclick(){
        this.$router.back()
      },
      //点击切换颜色
      centeritemclick(index){
        this.currentindex = index
      }
    }
  }
</script>


<style scoped>
  .detail-nav-bar .left {
    margin-top: 6px;
  }

  .detail-nav-bar .center{
    display: flex;
    font-size: 14px;
  }

  .detail-nav-bar .centeritem {
    flex: 1;
  }

  .detail-nav-bar .active {
    color: var(--color-high-text);
  }
</style>
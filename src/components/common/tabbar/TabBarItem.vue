<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isactive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
<!--    <div :class="{active:isactive}">-->
<!--      <slot name="item-text"></slot>-->
<!--    </div>-->
    <div :style="active">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      link: String,
      activecolor:{
        type: String,
        default:'red'
      },
    },
    data(){
      return {
      }
    },
    computed:{
      //根据当前路由的path判断现在此路由是不是活跃路由
      isactive(){
        return this.$route.path.indexOf(this.link) != -1
      },
      //给活跃路由赋予颜色属性值
      active(){
        return this.isactive ? {color:this.activecolor} :{}
      }

    },
    methods:{
      itemclick(){
        // console.log('itemclick');
        this.$router.push(this.link)
        // console.log(this.link);
        // console.log(this.$route.path);
      },
    }
  }
</script>


<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align:middle;
  }
  .active {
    color: red;
  }

</style>
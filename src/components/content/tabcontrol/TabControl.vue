<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in contents" class="tabcontrol-item"
         :class="{active:currentindex==index}"
          @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      contents:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentindex:0
      }
    },
    methods:{
      itemclick(index){
        this.currentindex =index
        this.$emit('tabitemclick',index)
      },
    }
  }
</script>

<style scoped>
.tabcontrol {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  font-weight: 700;
}

.tabcontrol-item {
  flex: 1;

}

.tabcontrol-item span {
  padding-bottom: 5px;
}

  .active {
    color: var(--color-high-text);
  }

.active span {
  border-bottom:2px solid var(--color-high-text);
}
</style>
<template>
  <div class="total-info" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,duration=1500){
        this.message=message
        this.isShow=true
        setTimeout(()=>{
          this.isShow=false
        },duration)

      }
    }
  }
</script>

<style scoped>
  .total-info {
    position: fixed;
    z-index: 99;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.5);
    padding: 8px 10px;
    border-radius: 5px;
    color: #fff;
  }
</style>
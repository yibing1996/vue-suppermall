<template>
  <div class="check-button" :class="{'checkbuttonactive':isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    position: relative;
    margin:0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;  /* 鼠标在上面的时候是一只手*/
  }

  .checkbuttonactive {
    background-color: #ff8198;
    border-color: #ff8198;
  }

</style>
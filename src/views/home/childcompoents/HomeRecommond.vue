<template>
  <div>
    <ul class="recommond">
      <li v-for="item in recommends" class="recommond-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          {{item.title}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommond",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommond{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 30px;
    /*border: 0;*/
    margin: 0;
    border-bottom: 10px solid #eee;
    font-size: 12px;
  }

  .recommond-item {
    flex:1
  }

  .recommond-item img {
    width: 100%;
    margin-bottom: 10px;
  }


</style>
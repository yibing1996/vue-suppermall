<template>
  <div v-if="Object.keys(comment).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="comment.user.avatar" alt="">
      <span>{{comment.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{comment.content}}</p>
      <div class="info-other">
        <span class="date">{{comment.created | showData()}}</span>
        <span>{{comment.style}}</span>
      </div>
      <div class="info-images">
        <img v-for="(item,index) in comment.images" :src="item" alt="" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'
  export default {
    name: "DetailCommentInfo",
    props:{
      comment:{
        type:Object,
        defaule(){
          return {}
        }
      }
    },
    filters:{
      showData(value){
        const date = new Date(value*1000)
        return formatDate(date,'yyyy-MM-dd')
      }
    }

  }
</script>

<style scoped>
  .comment-info {
    padding: 20px 15px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    font-size: 13px;
    margin-right: 10px;
  }

  .arrow-right {
    display: inline-block;
    width: 9px;
    height: 9px;
    border-top: 1px solid rgba(0,0,0,.4);
    border-right: 1px solid rgba(0,0,0,.4);
    transform: rotate(45deg);
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-images {
    margin-top: 10px;
  }

  .info-images img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }

</style>
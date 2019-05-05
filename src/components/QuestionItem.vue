<template>
  <div class="content-item">
    <h3 class="content-item-title">
      <el-link class="content-item-title-name" @click="view(id)" :underline="false">
        {{title}}
      </el-link>
    </h3>
    <div class="rich-content">
      <div class="rich-content-cover">
        <img :src="coverPath" alt="hello world">
      </div>
      <div class="rich-content-inner">
        <span>{{content}}</span>
        <el-button type="text">阅读全文<i class="el-icon-arrow-down"></i></el-button>
      </div>
    </div>
    <div class="rich-content-actions">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" size="medium" icon="el-icon-caret-top" plain>赞同{{voteCount}}</el-button>
          <el-button type="primary" size="medium" icon="el-icon-caret-bottom" plain></el-button>
          <el-button type="text" icon="el-icon-chat-round">{{commentCount}}条评论</el-button>
          <el-button type="text" icon="el-icon-s-promotion">分享</el-button>
          <el-button type="text" icon="el-icon-star-on">收藏</el-button>
          <el-button type="text" icon="el-icon-more"></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuestionItem",
    props: {
      id: Number,
      title: String,
      content: String,
      gmtCreate: Date,
      gmtModified: Date,
      answerCount: Number,
      voteCount: Number,
      commentCount: Number,
      coverPath: String,
    },
    data() {
      return {}
    },
    methods: {
      view: function (id) {
        console.log('This is a title:' + id);
        this.$router.push({path: '/question'})
      }
    }
  }
</script>

<style scoped>

  .content-item {
    padding: 20px;
    margin-bottom: 10px;
    text-align: left;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .content-item-title-name {
    font-size: 18px;
    font-weight: 600;
    color: inherit
  }


  .rich-content-cover {
    display: inline-block;
    vertical-align: middle;
    width: 25%;
    height: 100px;
    overflow: hidden;
    margin: 5px 0 10px;
  }

  .rich-content-cover img {
    width: 100%;
    height: 100%;
  }

  .rich-content-inner {
    display: inline-block;
    vertical-align: middle;
    width: 70%;
    margin: 5px 10px;
  }

</style>

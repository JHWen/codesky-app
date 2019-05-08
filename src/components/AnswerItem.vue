<template>
  <div class="answer-item-card">
    <div class="answer-item-author">
      <el-image class="author-avatar" :src="author.avatarUrl" fit="cover"></el-image>
      <div class="author-info">
        <span class="author-info-name">{{author.username}}</span>
        <div class="author-meta">
          <span style="font-size: 14px">{{author.headline}}</span>
        </div>
      </div>
    </div>

    <div class="answer-content">
      <div class="answer-content-abstract">

      </div>
      <div class="answer-content-fulltext">
        <div v-html="content"></div>
      </div>

      <el-image :src="coverUrl" fit="fill"></el-image>
      <el-row>
        <el-row :span="24">
          <el-button class="el-button-unfold" type="text">展开阅读全文<i class="el-icon-arrow-down"></i></el-button>
        </el-row>
      </el-row>
    </div>
    <div class="answer-footer">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-caret-top" size="medium" plain>赞同{{voteupCount}}</el-button>
          <el-button type="primary" icon="el-icon-caret-bottom" size="medium" plain></el-button>
          <el-button type="text" icon="el-icon-s-comment">{{commentCount}}条评论</el-button>
          <el-button type="text" icon="el-icon-s-promotion">分享</el-button>
          <el-button type="text" icon="el-icon-star-on">收藏</el-button>
          <el-button type="text" icon="el-icon-lollipop">感谢</el-button>
          <el-button type="text" icon="el-icon-more"></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AnswerItem",
    props: {
      id: Number,
      content: String,
      excerpt: String,
      commentCount: Number,
      voteupCount: Number,
      anonymously: Boolean,
      coverUrl: String,
      gmtCreate: String,
      gmtModified: String,
      author: Object
    },
    data() {
      return {}
    },
  }
</script>

<style scoped>
  .answer-item-card {
    background-color: #FFFFFF;
    margin-top: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .el-button-unfold {
    display: block;
    margin: 8px auto;
  }

  .author-avatar {
    width: 38px;
    height: 38px;
    display: inline-block;
    vertical-align: middle;
  }

  .author-info {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
  }

  .author-info-name {
    font-size: 15px;
    font-weight: 600;
  }

  .author-meta {
    font-size: 12px;
    color: #969696;
  }
</style>

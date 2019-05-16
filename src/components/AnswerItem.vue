<template>
  <div class="answer-item-card">
    <div class="answer-item-author">
      <el-row>
        <el-col :span="10">
          <el-image class="author-avatar" :src="author.avatarUrl" fit="cover"></el-image>
          <div class="author-info">
            <span class="author-info-name">{{author.username}}</span>
            <div class="author-meta">
              <span style="font-size: 14px">{{author.headline}}</span>
            </div>
          </div>
        </el-col>
        <el-col :offset="12" :span="2">
          <el-button type="primary" icon="el-icon-plus" size="medium">关注</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="answer-content">
      <div class="answer-content-abstract" v-show="isHiddenAll">
        <p>{{excerpt}}</p>
        <el-row>
          <el-col :span="24">
            <el-button class="el-button-unfold" type="text" @click="showAll">展开阅读全文<i class="el-icon-arrow-down"></i>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="answer-content-fulltext" v-show="isShowAll">
        <div v-html="content"></div>
        <el-image v-show="coverUrl.length>0" :src="coverUrl" fit="fill"></el-image>
      </div>
    </div>
    <div class="answer-footer">
      <el-row>
        <el-col :span="22">
          <el-button type="primary" icon="el-icon-caret-top" @click="voteUpAnswer"
                     size="medium" :plain="voteUpButtonPlain">
            赞同 {{voteupCount}}
          </el-button>
          <el-button type="primary" icon="el-icon-caret-bottom" size="medium" plain></el-button>
          <el-button type="text" icon="el-icon-s-comment">{{commentCount}}条评论</el-button>
          <el-button type="text" icon="el-icon-s-promotion">分享</el-button>
          <el-button type="text" icon="el-icon-star-on">收藏</el-button>
          <el-button type="text" icon="el-icon-lollipop">感谢</el-button>
          <el-button type="text" icon="el-icon-more"></el-button>
        </el-col>
        <el-col :span="2" v-show="isShowAll">
          <el-button @click="hiddenAll" type="text" icon="el-icon-arrow-up">收起</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {voteAnswerApi} from "../api/answer";

  export default {
    name: "AnswerItem",
    props: {
      id: Number,
      content: String,
      excerpt: String,
      commentCount: Number,
      voteupCount: Number,
      anonymously: Boolean,
      coverUrl: {
        type: String,
        default: ''
      },
      gmtCreate: String,
      gmtModified: String,
      author: Object
    },
    data() {
      return {
        isShowAll: false,
        isHiddenAll: true,
        voteUpButtonPlain: true
      }
    },
    methods: {
      showAll: function () {
        this.isShowAll = true;
        this.isHiddenAll = false;
      },
      hiddenAll: function () {
        this.isShowAll = false;
        this.isHiddenAll = true;
      },
      //赞踩回答
      voteUpAnswer: function () {
        let type = 'up';
        if (this.voteUpButtonPlain) {
          type = 'up'
        } else {
          type = 'neutral'
        }
        let that = this;
        voteAnswerApi(this.id, type)
          .then(data => {
            console.log(data);
            console.log('点赞成功');
            that.voteUpButtonPlain = data.voting !== 'VOTEUP';
            that.voteupCount = data.voteCount;
          })
          .catch(error => {
            console.log('点赞失败');
            that.$message({
              type: 'error',
              message: error,
              showClose: true
            });
          });

      },
    }
  }
</script>

<style scoped>
  .answer-item-card {
    background-color: #FFFFFF;
    margin-top: 10px;
    padding: 20px;
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

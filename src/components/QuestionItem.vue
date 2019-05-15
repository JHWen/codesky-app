<template>
  <div class="content-item">
    <h3 class="content-item-title">
      <el-link class="content-item-title-name" @click="view(id)" :underline="false">
        {{title}}
      </el-link>
    </h3>
    <!--  answer type  -->
    <template v-if="itemType.isAnswer">
      <div class="rich-content">
        <div class="abstract-content" v-show="isHiddenAll">
          <div class="rich-content-cover">
            <el-image style="width: 100%;height: 100%" :src="answer.coverUrl" fit="cover" alt="hello world"></el-image>
          </div>
          <div class="rich-content-inner">
            <span>{{answer.excerpt}}</span>
            <el-button type="text" @click="showAll">阅读全文<i class="el-icon-arrow-down"></i></el-button>
          </div>
        </div>
        <div class="full-content" v-show="isShowAll">
          <div v-html="answer.content"></div>
        </div>
      </div>
      <div class="rich-content-actions">
        <el-row>
          <el-col :span="22">
            <el-button type="primary" size="medium" @click="voteUpAnswer"
                       icon="el-icon-caret-top" :plain="voteUpButtonPlain">
              赞同 {{answer.voteupCount}}
            </el-button>
            <el-button type="primary" size="medium" icon="el-icon-caret-bottom" plain></el-button>
            <el-button type="text" icon="el-icon-chat-round">{{answer.commentCount}}条评论</el-button>
            <el-button type="text" icon="el-icon-s-promotion">分享</el-button>
            <el-button type="text" icon="el-icon-star-on">收藏</el-button>
            <el-button type="text" icon="el-icon-more"></el-button>
          </el-col>
          <el-col :span="2" v-show="isShowAll">
            <el-button @click="hiddenAll" type="text" icon="el-icon-arrow-up">收起</el-button>
          </el-col>
        </el-row>
      </div>
    </template>

    <!--  question type  -->
    <template v-else>
      <div class="rich-content">
        <div class="question-rich-content-inner">
          <span>{{content}}</span>
          <el-button type="text">显示全部<i class="el-icon-arrow-down"></i></el-button>
        </div>
      </div>
      <div class="rich-content-actions">
        <el-row>
          <el-col :span="24">
            <el-button type="primary" size="medium">关注问题</el-button>
            <el-button type="text" icon="el-icon-user-solid">{{followerCount}}人关注</el-button>
            <el-button type="text" icon="el-icon-chat-round">{{commentCount}}条评论</el-button>
            <el-button type="text" icon="el-icon-s-promotion">分享</el-button>
            <el-button type="text" icon="el-icon-star-on">收藏</el-button>
            <el-button type="text" icon="el-icon-more"></el-button>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
  import {voteAnswerApi} from "../api/answer";

  export default {
    name: "QuestionItem",
    props: {
      id: Number,
      title: String,
      content: String,
      answerCount: Number,
      commentCount: Number,
      followerCount: Number,
      gmtCreate: String,
      gmtModified: String,
      type: String,
      author: Object,
      answer: Object,
    },
    data() {
      return {
        isShowAll: false,
        isHiddenAll: true,
        voteUpButtonPlain: true
      }
    },
    computed: {
      itemType() {
        let isAnswer = this.type === 'answer';
        return {
          isAnswer
        }
      }
    },
    methods: {
      view: function (id) {
        console.log('This is a title:' + id);
        this.$router.push({path: `/question/${id}`})
      },
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
        voteAnswerApi(this.answer.id, type)
          .then(data => {
            console.log(data);
            console.log('点赞成功');
            that.voteUpButtonPlain = data.voting !== 'VOTEUP';
            that.answer.voteupCount = data.voteCount;
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

  .rich-content-inner {
    display: inline-block;
    vertical-align: middle;
    width: 70%;
    margin: 5px 10px;
  }

  .question-rich-content-inner {

  }

</style>

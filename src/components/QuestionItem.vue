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
        <div class="abstract-content" v-bind:class="{width25:classComputed.hasCover}" v-show="isHiddenAll">
          <div class="rich-content-cover" v-show="answer.coverUrl">
            <el-image style="width: 100%;height: 100%" :src="answer.coverUrl" fit="cover"
                      alt="hello world"></el-image>
          </div>
          <div class="rich-content-inner" v-bind:class="{width75:classComputed.hasCover}">
            <strong>{{answer.author.username}}:</strong>
            <span>{{answer.excerpt}}</span>
            <el-button type="text" @click="showAll">阅读全文<i class="el-icon-arrow-down"></i></el-button>
          </div>
        </div>
        <div class="full-content-item" v-show="isShowAll">
          <div class="answer-item-author">
            <el-row>
              <el-col :span="10">
                <el-image class="author-avatar" :src="answer.author.avatarUrl" fit="cover"></el-image>
                <div class="author-info">
                  <!-- <span class="author-info-name">{{answer.author.username}}</span>-->
                  <el-link class="author-info-name" :href="`/people/${answer.author.username}`">
                    {{answer.author.username}}
                  </el-link>
                  <div class="author-meta">
                    <span style="font-size: 14px">{{answer.author.headline}}</span>
                  </div>
                </div>
              </el-col>
              <el-col v-show="!answerComputed.isMe" :offset="10" :span="4">
                <el-button v-show="!hasFollow" @click="handleFollow(answer.author.id)"
                           type="primary" icon="el-icon-plus"
                           size="medium">关注
                </el-button>
                <el-button v-show="hasFollow" @click="cancelFollow(answer.author.id)"
                           type="info" size="medium">已关注
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="full-content" v-html="answer.content"></div>
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
  import {followMemberApi, unfollowMemberApi} from "../api/user";

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
        voteUpButtonPlain: true,
        hasFollow: this.answer ? this.answer.author.hasFollow : false,
      }
    },
    computed: {
      itemType() {
        let isAnswer = this.type === 'answer';
        return {
          isAnswer
        }
      },
      classComputed() {
        let hasCover = this.answer.hasOwnProperty('coverUrl');
        return {
          hasCover
        }
      },
      answerComputed() {
        let isMe = this.$store.state.id === this.answer.author.id;
        return {
          isMe
        }
      },
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
      handleFollow: function (authorId) {
        console.log('following author:' + this.author.username);
        let that = this;
        followMemberApi(authorId)
          .then(data => {
            console.log(that.author.username + '的关注者：' + JSON.stringify(data));
            that.hasFollow = true;
          })
          .catch(error => {
            that.hasFollow = false;
            console.log(error);
            that.$message({
              type: 'error',
              message: '关注失败',
              showClose: true
            });
          });
      },
      cancelFollow: function (authorId) {
        console.log('cancel follow author:' + this.author.username);
        let that = this;
        unfollowMemberApi(authorId)
          .then(data => {
            console.log(that.author.username + '的关注者：' + JSON.stringify(data));
            that.hasFollow = false;
          })
          .catch(error => {
            console.log(error);
            that.$message({
              type: 'error',
              message: '关注失败',
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

  .rich-content {
    text-align: justify;
  }


  .rich-content-cover {
    display: inline-block;
    vertical-align: middle;
    height: 100px;
    overflow: hidden;
    margin: 5px 0 10px;
  }

  .rich-content-inner {
    display: inline-block;
    vertical-align: middle;
    margin: 5px 0 10px;
  }

  /*分离出动态宽度class*/
  .width25 {
    width: 25%;
  }

  .width75 {
    width: 70%;
  }

  .question-rich-content-inner {

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

  .full-content {
    margin: 12px 0 12px;
  }

</style>

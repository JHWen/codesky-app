<template>
  <div class="question-container">
    <el-container direction="vertical">
      <el-main class="question-main">
        <div class="question-header">
          <div class="question-header-side">
            <div class="number-board-item">
              <span class="number-board-item-name">关注者</span>
              <div class="number-board-item-count">
                <strong>{{question.followerCount}}</strong>
              </div>
            </div>
            <el-divider content-position="center" direction="vertical"></el-divider>
            <div class="number-board-item">
              <span class="number-board-item-name">被浏览</span>
              <div class="number-board-item-count">
                <strong>{{question.watchCount}}</strong>
              </div>
            </div>
          </div>

          <div class="question-header-main">
            <div class="question-header-tags">
              <el-tag class="question-tag" v-for="tag in question.tags" :key="tag">
                {{tag}}
              </el-tag>
            </div>
            <h1 class="question-header-title">
              {{question.title}}
            </h1>
            <div class="question-header-detail">
              <span style="text-align: justify;">{{question.content}}</span>
              <el-button type="text">显示全部<i class="el-icon-arrow-down"></i></el-button>
            </div>
          </div>

          <div class="question-header-footer">
            <el-row>
              <el-col :span="24">
                <el-button type="primary" size="medium">关注问题</el-button>
                <el-button type="primary" size="medium" icon="el-icon-edit" @click="showEditor" plain>写回答</el-button>
                <el-button type="primary" size="medium" icon="el-icon-s-custom" plain>邀请回答</el-button>
                <el-button type="text" icon="el-icon-s-comment">{{question.commentCount}}条评论</el-button>
                <el-button type="text" icon="el-icon-s-promotion">分享</el-button>
                <el-button type="text" icon="el-icon-s-flag">举报</el-button>
                <el-button type="text" icon="el-icon-more"></el-button>
              </el-col>
            </el-row>
          </div>
        </div>

        <!--  写回答编辑器  markdown or 富文本 -->
        <div class="answer-add" v-show="isWriteAnswer">
          <div class="answer-add-header">
            <el-image class="author-avatar" :src="user.avatarUrl" fit="cover"
                      style="width: 38px;height: 38px"></el-image>
            <div class="author-info">
              <span class="author-info-name">{{user.username}}</span>
              <div class="author-meta">
                <span style="font-size: 14px">{{user.headline}}</span>
              </div>
            </div>
          </div>
          <div class="answer-add-editor">
            <div ref="editor" style="text-align:left"></div>
          </div>
          <div class="answer-add-footer">
            <el-row>
              <el-col style="text-align: right" :span="24">
                <el-button type="text" icon="el-icon-s-tools">设置</el-button>
                <el-button type="primary" size="medium" v-on:click="showEditorContent">查看内容</el-button>
                <el-button type="primary" size="medium" @click="submitAnswer()">提交回答</el-button>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="question-answer-main">
          <answer-item v-for="answer in answers" :key="answer.id" v-bind="answer"></answer-item>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import WangEditor from 'wangeditor'
  import AnswerItem from '../../components/AnswerItem'
  import {getQuestionData} from "../../api/question";
  import {postAnswer} from "../../api/answer";
  import ElHeader from "element-ui/packages/header/src/main";

  export default {
    name: "QuestionView",
    components: {ElHeader, AnswerItem},
    data() {
      const item = {
        id: 1,
        content: '当看到惊队一下轰炸灭霸战舰的时候我心里只有一个念头：姐姐你悠着点啊，再打电影就崩了。幸亏被灭霸一拳打飞，要不差点重演正联惨剧',
        coverUrl: 'https://pic1.zhimg.com/80/a59d928f55737702df4a13283558c81f_hd.jpg',
        author: {
          authorName: '我的情人乌发碧眼',
          headline: '有鹿踏红叶，呦呦彻山林',
          avatarUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
      };
      return {
        answers: [],
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        editorContent: '',
        isWriteAnswer: false,
        // 问题描述
        question: {
          id: 0,
          title: '如何评价惊奇队长在复联4中的表现？',
          content: '本题已加入知乎圆桌，更多「复联」讨论欢迎关注 »',
          answerCount: 0,
          commentCount: 0,
          followerCount: 0,
          watchCount: 10,
          gmtCreate: '',
          gmtModified: '',
          tags: ['问题', '话题', '标签']
        },
      }
    },
    computed: {
      user() {
        let id = this.$store.state.id;
        let username = this.$store.state.username;
        let avatarUrl = this.$store.state.avatarUrl;
        let headline = this.$store.state.headline;
        return {
          id, username, avatarUrl, headline
        }
      }
    },
    created() {
      let questionId = this.$route.params.questionId;
      this.getQuestionWithAnswers(questionId)
    },
    beforeRouteUpdate(to, from, next) {
      let questionId = to.params.questionId;
      this.getQuestionWithAnswers(questionId);
      next();
    },
    methods: {
      showEditorContent: function () {
        console.log(this.editorContent);
        alert(this.editorContent);
      },
      showEditor: function () {
        console.log('show editor!');
        this.isWriteAnswer = true;
      },
      submitAnswer: function () {
        //提交回答
        alert('提交回答啦！');
        let that = this;
        postAnswer(this.question.id, this.editorContent)
          .then(data => {
            //提交回答成功
            console.log('提交回答成功');

            that.$message({
              type: 'success',
              message: 'submit answer success',
              showClose: true
            });

            that.$router.go(0);

          })
          .catch(error => {
            that.$message({
              type: 'error',
              message: error,
              showClose: true
            });
          });

      },
      getQuestionWithAnswers(questionId) {
        let that = this;
        getQuestionData(questionId)
          .then(data => {
            that.$message({
              type: 'success',
              message: 'get question success',
              showClose: true
            });
            console.log(data);

            //设置问题信息
            that.setQuestion(data);

            //设置回答信息list
            that.setAnswers(data);

          })
          .catch(error => {
            that.$message({
              type: 'error',
              message: error,
              showClose: true
            });
          });

      },
      setQuestion: function (data) {
        this.question.id = data.id;
        this.question.title = data.title;
        this.question.content = data.content;
        this.question.followerCount = data.followerCount;
        this.question.commentCount = data.commentCount;
        this.question.answerCount = data.answers;
        this.question.gmtCreate = data.gmtCreate;
        this.question.gmtModified = data.gmtModified;
      },
      setAnswers: function (data) {
        this.answers = data.answers;
      }
    },
    mounted() {
      let editor = new WangEditor(this.$refs.editor);
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      };
      editor.create();
    }
  }
</script>

<style scoped>
  .question-container {
    width: 1000px;
    margin: 68px auto;
    text-align: left;
  }

  /*消除el-main的默认10px的内边距*/
  .question-main {
    padding: 0;
    overflow: hidden;
  }

  .question-header {
    background-color: #FFFFFF;
    /*border-bottom: 1px solid #dcdfe6;*/
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .question-tag {
    margin-left: 8px;
  }

  .question-header-side {
    float: right;
    text-align: center;
  }

  .number-board-item-name {
    font-size: 14px;
    color: #8590a6;
    line-height: 1.6;
  }

  .number-board-item-count {
    font-size: 18px;
    color: #1a1a1a;
    font-weight: 600;
    line-height: 1.6;
  }

  .el-divider {
    height: 3em;
    vertical-align: top;
  }

  .number-board-item {
    display: inline-block;
  }


  .author-avatar {
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


  .answer-add {
    background-color: #FFFFFF;
    margin-top: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .answer-add-editor {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>

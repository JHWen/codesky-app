<template>
  <div class="question-list">
    <el-container class="question-content-container">
      <el-main class="question-main">
        <question-item v-for="question in questions" :key="question.id" v-bind="question"></question-item>
      </el-main>

      <el-aside class="question-aside">
        <el-card class="side-card">
          <div slot="header">
            <span>Card</span>
          </div>
          <div v-for="it in listItem" class="text item">
            <i class="el-icon-star-off"></i>{{it}}
          </div>
        </el-card>
      </el-aside>
    </el-container>


  </div>
</template>

<script>
  import QuestionItem from '@/components/QuestionItem'
  import {getLatestQuestion} from '../api/question';

  export default {
    name: "QuestionList",
    created() {
      this.getLatestQuestions(0, 8);
    },
    data() {
      const item = {
        id: -1,
        title: '你写过什么有趣的程序？',
        content: ' 我大三学习《计算机图形学》这门课，在最后的大作业项目，上交了这个程序，全篇使用了C语言和OpenGL。摘得两个卓越班班里最高分。 本来想做个超人模拟，又想到了推箱子、超级马里奥这些小游戏…',
        voteCount: 233,
        commentCount: 234,
        coverPath: require('../assets/cover.jpg')
      };
      return {
        questions: '',
        listItem: ['我的收藏', '我关注的问题', '我的邀请', '我的余额', '站务中心']
      }
    },
    components: {
      QuestionItem,
    },
    methods: {
      getLatestQuestions: function () {
        let that = this;
        getLatestQuestion(0, 10)
          .then(data => {
            console.log('拉取最新问题');
            that.questions = data;
            that.$message({
              type: 'success',
              message: '刷新成功',
              showClose: true
            });

          })
          .catch(error => {
            that.$message({
              type: 'error',
              message: error,
              showClose: true
            });

          });
      }
    },
  }
</script>

<style scoped>
  .question-content-container {
    max-width: 1000px;
    margin: 68px auto;
  }

  .question-main {
    padding: 0;
    margin-top: 8px;
  }

  .question-aside {
    margin-top: 8px;
    margin-left: 8px;
  }


  .text {
    font-size: 14px;
    text-align: left;
  }

  .item {
    margin-bottom: 18px;
  }

</style>

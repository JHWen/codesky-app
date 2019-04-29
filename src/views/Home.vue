<template>
  <div id="home">
    <el-container direction="vertical">
      <my-header class="main-header"></my-header>
      <el-main>
        <div class="main-content">

          <div v-for="question in questions" :key="question.title" class="content-item">
            <h3 class="content-item-title">
              <el-link @click="view" :underline="false" style="font-size: 18px;font-weight: bold;color: inherit">
                {{question.title}}
              </el-link>
            </h3>
            <div class="rich-content">
              <div class="rich-content-cover">
                <img src="../assets/cover.jpg" alt="hello world">
              </div>
              <div class="rich-content-inner">
                <span>
                  {{question.content}}
                </span>
              </div>
              <div class="rich-content-actions">
                <el-row>
                  <el-col :span="4">
                    <el-button type="primary" icon="el-icon-caret-top" plain>赞同{{question.voteCounts}}</el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="primary" icon="el-icon-caret-bottom" plain></el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="text" icon="el-icon-chat-round">{{question.commentCounts}}条评论</el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="text" icon="el-icon-s-promotion">分享</el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="text" icon="el-icon-star-on">收藏</el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="text" icon="el-icon-more"></el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>


        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import MyHeader from '@/views/MyHeader'

  export default {
    name: "Index",
    data() {
      const item = {
        title: '你写过什么有趣的程序？',
        content: ' 我大三学习《计算机图形学》这门课，在最后的大作业项目，上交了这个程序，全篇使用了C语言和OpenGL。摘得两个卓越班班里最高分。 本来想做个超人模拟，又想到了推箱子、超级马里奥这些小游戏…',
        voteCounts: 233,
        commentCounts: 234
      };
      return {
        questions: Array(20).fill(item)
      }
    },
    computed: {},
    components: {
      MyHeader
    },
    methods: {
      view: function () {
        alert('This is a title');
      }
    }
  }
</script>

<style scoped>
  #home {
    width: 100%;
    background-color: antiquewhite;
  }

  /*.main-header{*/
  /*  position: fixed;*/
  /*  z-index: 10;*/
  /*}*/

  .main-content {
    width: 1000px;
    margin: 10px auto;
  }

  .content-item {
    width: 700px;
    padding: 20px;
    margin-top: 20px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }


  .content-item-title {
    text-align: left;
  }

  .rich-content-cover {
    width: 25%;
    height: 100px;
    float: left;
    overflow: hidden;
    margin: 5px 0 10px;
  }

  .rich-content-cover img {
    width: 100%;
    height: 100%;
  }

  .rich-content-inner {
    width: 70%;
    margin: 5px 10px;
    float: left;
    text-align: left;
  }

  .rich-content-actions {
    clear: both;
  }
</style>

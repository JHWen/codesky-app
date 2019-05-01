<template>
  <el-container class="question-container" direction="vertical">
    <el-main class="question-main">
      <div class="question-header">
        <div class="question-header-side">
          <div class="number-board-item">
            <span class="number-board-item-name">关注者</span>
            <div class="number-board-item-count">
              <strong>548</strong>
            </div>
          </div>
          <el-divider content-position="center" direction="vertical"></el-divider>
          <div class="number-board-item">
            <span class="number-board-item-name">被浏览</span>
            <div class="number-board-item-count">
              <strong>1,872,230</strong>
            </div>
          </div>
        </div>

        <div class="question-header-main">
          <div class="question-header-tags">
            <el-tag>超级英雄</el-tag>
            <el-tag>漫威（Marvel Comics）</el-tag>
            <el-tag>复仇者联盟（电影）</el-tag>
            <el-tag>惊奇队长（电影）</el-tag>
          </div>
          <h1 class="question-header-title">如何评价惊奇队长在复联4中的表现？</h1>
          <div class="question-header-detail">
            <span>本题已加入知乎圆桌，更多「复联」讨论欢迎关注 »</span>
            <el-button type="text">显示全部<i class="el-icon-arrow-down"></i></el-button>
          </div>
        </div>

        <div class="question-header-footer">
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="medium">关注问题</el-button>
              <el-button type="primary" size="medium" icon="el-icon-edit" @click="showEditor" plain>写回答</el-button>
              <el-button type="primary" size="medium" icon="el-icon-s-custom" plain>邀请回答</el-button>
              <el-button type="text" icon="el-icon-s-comment">7条评论</el-button>
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
          <el-image class="author-avatar" :src="avatar" fit="cover"
                    style="width: 38px;height: 38px"></el-image>
          <div class="author-info">
            <span class="author-info-name">笑忆微凉</span>
            <div class="author-meta">
              <span style="font-size: 14px">各处搬砖ing</span>
            </div>
          </div>
        </div>
        <div class="answer-add-editor">
          <div ref="editor" style="text-align:left"></div>
        </div>
        <div class="answer-add-footer">
          <el-row>
            <el-col :offset="18" :span="6">
              <el-button type="text" icon="el-icon-s-tools">设置</el-button>
              <el-button type="primary" size="medium" v-on:click="getContent">查看内容</el-button>
              <el-button type="primary" size="medium">提交回答</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="question-answer-main">
        <div v-for="answer in answers" :key="answer.id" class="answer-item-card">
          <div class="answer-item-author">
            <el-image class="author-avatar" :src="answer.avatarUrl" fit="cover"
                      style="width: 38px;height: 38px"></el-image>
            <div class="author-info">
              <span class="author-info-name">{{answer.authorName}}</span>
              <div class="author-meta">
                <span style="font-size: 14px">{{answer.authorMeta}}</span>
              </div>
            </div>
          </div>
          <div class="answer-content">
            <p>{{answer.answerContent}}</p>
            <el-image :src="answer.contentImg" fit="fill"></el-image>
            <el-row>
              <el-row :span="24">
                <el-button class="el-button-unfold" type="text">展开阅读全文<i class="el-icon-arrow-down"></i></el-button>
              </el-row>
            </el-row>
          </div>
          <div class="answer-footer">
            <el-row>
              <el-col :span="24">
                <el-button type="primary" icon="el-icon-caret-top" size="medium" plain>赞同125</el-button>
                <el-button type="primary" icon="el-icon-caret-bottom" size="medium" plain></el-button>
                <el-button type="text" icon="el-icon-s-comment">7条评论</el-button>
                <el-button type="text" icon="el-icon-s-promotion">分享</el-button>
                <el-button type="text" icon="el-icon-star-on">收藏</el-button>
                <el-button type="text" icon="el-icon-lollipop">感谢</el-button>
                <el-button type="text" icon="el-icon-more"></el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>

</template>

<script>
  import WangEditor from 'wangeditor'

  export default {
    name: "QuestionView",
    components: {},
    data() {
      const item = {
        id: 1,
        avatarUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        authorName: '我的情人乌发碧眼',
        authorMeta: '有鹿踏红叶，呦呦彻山林',
        answerContent: '当看到惊队一下轰炸灭霸战舰的时候我心里只有一个念头：姐姐你悠着点啊，再打电影就崩了。幸亏被灭霸一拳打飞，要不差点重演正联惨剧',
        contentImg: 'https://pic1.zhimg.com/80/a59d928f55737702df4a13283558c81f_hd.jpg',
      };
      return {
        answers: Array(10).fill(item),
        avatar: 'https://pic4.zhimg.com/7ce6c0d0629085cb9c632ea2b7e0b5d3_xs.jpg',
        imgExp: item.contentImg,
        editorContent: '',
        isWriteAnswer: false
      }
    },
    methods: {
      getContent: function () {
        alert(this.editorContent)
      },
      showEditor: function () {
        console.log('show editor!');
        this.isWriteAnswer = true;
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
    max-width: 1000px;
    margin: 68px auto;
    text-align: left;
  }

  /*消除el-main的默认10px的内边距*/
  .question-main {
    padding: 0;
  }

  .question-header {
    background-color: #FFFFFF;
    /*border-bottom: 1px solid #dcdfe6;*/
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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

  .answer-item-card {
    background-color: #FFFFFF;
    margin-top: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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

  .el-button-unfold {
    display: block;
    margin: 8px auto;
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

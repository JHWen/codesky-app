<template>
  <div class="top-header">
    <el-header class="header-area">
      <el-row class="header-main">
        <el-col :span="18">
          <el-menu :router="true" :default-active="activeIndex" mode="horizontal">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="">发现</el-menu-item>
            <el-menu-item index="">话题</el-menu-item>
            <el-menu-item index="">讨论</el-menu-item>
            <el-menu-item>
              <el-input type="text" placeholder="请输入内容" suffix-icon="el-icon-search" clearable></el-input>
            </el-menu-item>
            <el-menu-item>
              <el-button type="primary" size="medium" @click="dialogFormVisible=true">提问</el-button>
            </el-menu-item>
          </el-menu>
        </el-col>

        <el-col :span="6">
          <el-menu :router="true" :default-active="activeIndex" mode="horizontal">

            <template v-if="!user.isLogin">
              <el-menu-item index="/login">
                <el-button type="text">登录</el-button>
              </el-menu-item>
              <el-menu-item index="/login">
                <el-button type="text">注册</el-button>
              </el-menu-item>
            </template>

            <template v-else>
              <el-menu-item index="">
                <i class="el-icon-message-solid"></i>
              </el-menu-item>
              <el-menu-item index="">
                <i class="el-icon-chat-dot-round"></i>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <img class="user-avatar" :src="user.avatar" alt="hello world"/>
                </template>
                <el-menu-item :index="`/profile/${user.username}`">
                  <el-button icon="el-icon-s-custom" type="text">我的主页</el-button>
                </el-menu-item>
                <el-menu-item index="">
                  <el-button icon="el-icon-s-tools" type="text">设置</el-button>
                </el-menu-item>
                <el-menu-item @click="logout">
                  <el-button icon="el-icon-switch-button" type="text">退出</el-button>
                </el-menu-item>
              </el-submenu>
            </template>

          </el-menu>
        </el-col>
      </el-row>
    </el-header>

    <!--  提问对话框  -->
    <el-dialog class="question-add-dialog" title="提问" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="questionForm" status-icon :model="questionForm" :rules="questionFormRules">
        <el-form-item prop="title">
          <el-input v-model="questionForm.title" placeholder="问题标题"></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10 }" :row="4" v-model="questionForm.content"
                    placeholder="请输入问题的描述信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="publishQuestion('questionForm')">发布</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {postQuestion} from '../api/question'

  export default {
    name: "MyHeader",
    components: {},
    data() {
      return {
        activeIndex: "/",
        dialogFormVisible: false,
        questionForm: {
          title: '',
          content: '',
          isAnonymously: false
        },
        questionFormRules: {
          title: [
            {required: true, message: '请输入问题标题', trigger: 'blur'},
            {min: 2, message: '不能少于2个字符', trigger: 'blur'}
          ],
          content: []
        }
      }
    },
    computed: {
      user() {
        let isLogin = this.$store.state.username.length !== 0;
        let avatar = this.$store.state.avatarUrl;
        let username = this.$store.state.username;
        return {
          isLogin, avatar, username
        }
      }
    }, methods: {
      logout: function (index, indexPath) {
        let that = this;

        this.$store.dispatch('logout').then(() => {
          console.log('注销成功 in header');

          that.$message({
            type: 'success',
            message: '注销成功',
            showClose: true
          });

          console.log('logout,index:' + index + ' indexPath:' + indexPath)
          that.$router.push('/login');

        }).catch(error => {
          that.$message({
            type: 'error',
            message: error,
            showClose: true
          });
        });

      },
      publishQuestion: function (formName) {
        //this.dialogFormVisible = false;
        let that = this;
        console.log('开始提交问题');
        this.$refs[formName].validate((valida) => {
          if (valida) {
            console.log('submit question');
            console.log(that.questionForm);
            // 调用后端提交问题api post
            postQuestion(that.questionForm)
              .then(data => {
                //添加成功
                console.log(data);
                that.$message({
                  type: 'success',
                  message: '成功提交问题',
                  showClose: true
                });
                that.dialogFormVisible = false;
                that.$router.push('/');

              })
              .catch(error => {
                that.$message({
                  type: 'success',
                  message: error,
                  showClose: true
                });

              });

          } else {
            console.log('validate error');
            return false;
          }
        });

      }
    }
  }
</script>

<style scoped>
  .header-area {
    position: fixed;
    z-index: 1024;
    max-height: 60px;
    background-color: #FFFFFF;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .header-main {
    margin: 0 auto;
    max-width: 1000px;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
  }

  .question-add-dialog {
    z-index: 1024;
  }
</style>

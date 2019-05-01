<template>
  <el-header class="my-header">
    <el-row>
      <el-col :span="20">
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">发现</el-menu-item>
          <el-menu-item index="3">话题</el-menu-item>
          <el-menu-item index="4">提问</el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="4">
        <el-menu :router="true" mode="horizontal">

          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/login">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu index="1">
              <template slot="title">
                <img :src="user.avatar" alt="hello world"/>
              </template>
              <el-menu-item index="/profile">
                <el-button icon="el-icon-s-custom" type="text">我的主页</el-button>
              </el-menu-item>
              <el-menu-item index="1-2">
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
</template>

<script>
  export default {
    name: "MyHeader",
    data() {
      return {
        activeIndex: "1"
      }
    },
    computed: {
      user() {
        let login = this.$store.state.name.length !== 0;
        let avatar = this.$store.state.avatar;
        return {
          login, avatar
        }
      }
    }, methods: {
      logout: function (index, indexPath) {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/');
          console.log('logout,index:' + index + ' indexPath:' + indexPath)
        })
      },
    }
  }
</script>

<style scoped>
  .my-header {
    margin: 0 auto;
    width: 1000px;
    background-color: #FFFFFF;
  }
</style>

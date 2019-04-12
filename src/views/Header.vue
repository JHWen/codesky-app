<template>
  <el-header class="me-header">
    <el-row>
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>

      <el-col :span="16">
        <el-menu mode="horizontal" active-text-color="#5FB878">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="2">发现</el-menu-item>
          <el-menu-item index="3">话题</el-menu-item>
          <el-menu-item index="4">提问</el-menu-item>
          <el-menu-item style="margin-left: 100px">
            <el-input v-model="search_text" aria-placeholder="请输入内容" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-menu-item>
        </el-menu>
      </el-col>


      <el-col :span="4">
        <el-menu :router="true" mode="horizontal">

          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="2">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu>
              <template slot="title">
                <img :src="user.avatar_url" alt="hello world">
              </template>
              <el-menu-item>
                <i class="el-icon-back"></i>退出
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
    name: "Header",
    data() {
      return {
        search_text: ""
      }
    },
    computed: {
      user() {
        let login = this.$store.state.name.length !== 0;
        let avatar_url = this.$store.state.avatar;
        return {
          login, avatar_url
        }
      }
    }
  }
</script>

<style scoped>
  .me-header {
    width: 100%;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

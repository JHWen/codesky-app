<template>
  <div id="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">

          </el-col>

          <el-col  :span="16">
            <el-menu mode="horizontal">
              <el-menu-item>首页</el-menu-item>
              <el-menu-item>发现</el-menu-item>
              <el-menu-item>话题</el-menu-item>
              <el-menu-item>提问</el-menu-item>
            </el-menu>
          </el-col>

          <el-col :span="4">
            <el-menu :router="true" mode="horizontal">

              <template v-if="!user.login">
                <el-menu-item index="/login">
                  <el-button type="text">登录</el-button>
                </el-menu-item>
                <el-menu-item index="">
                  <el-button type="text">注册</el-button>
                </el-menu-item>
              </template>

              <template v-else>
                <el-menu-item>
                  <img :src="user.avatar"/>
                </el-menu-item>
                <el-menu-item index="">
                  <el-button type="text">注销</el-button>
                </el-menu-item>
              </template>

            </el-menu>
          </el-col>
        </el-row>

      </el-header>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {}
    },
    computed: {
      user() {
        let login = this.$store.state.name.length !== 0;
        let avatar = this.$store.state.avatar;
        return {
          login, avatar
        }
      }
    }
  }
</script>

<style scoped>

</style>

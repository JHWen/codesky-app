<template>
  <div class="login-container">
    <div class="me-login-box me-login-box-radius">
      <el-form class="login-form" ref="userForm" :model="userForm" :rules="rules" label-width="80px">
        <h3 class="title">Codesky Space</h3>
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="用户名" v-model="userForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input placeholder="密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item label-width="0">
          <el-button type="primary" style="width: 100%" @click="login('userForm')">
            Sign in
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        userForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '不能少于6个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login(formName) {
        let that = this;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$store.dispatch('login', that.userForm).then(
              () => {
                that.$router.go(-1)
              }
            ).catch(error => {
              if (error !== 'error') {
                that.$message({
                  message: error,
                  type: 'error',
                  showClose: true
                });
              }
            })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("http://cdn.tycoding.cn/db29b0fbd2f78dd8c1b7.db29b0f.png");
  }

  .title {
    font-size: 26px;
    color: #409EFF;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }


  .me-login-box {
    position: absolute;
    width: 360px;
    height: 260px;
    background-color: white;
    margin-top: 100px;
    margin-left: -210px;
    left: 50%;
    padding: 30px;
  }

  .me-login-box-radius {
    border-radius: 10px;
    box-shadow: 0 0 1px 1px rgba(161, 159, 159, 0.1);
  }
</style>

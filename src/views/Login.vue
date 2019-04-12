<template>
  <div id="login">
    <div class="me-login-box me-login-box-radius">
      <h1>Codesky 登录</h1>
      <el-form ref="userForm" :model="userForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="用户名" v-model="userForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input placeholder="密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login('userForm')">
            登录
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
            that.$store.dispatch('login',that.userForm).then(
              ()=>{
                that.$router.go(-1)
              }
            ).catch(error=>{
              if (error!=='error'){
                that.$message({
                  message:error,
                  type:'error',
                  showClose:true
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

</style>

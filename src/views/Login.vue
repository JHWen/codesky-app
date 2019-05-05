<template>
  <div id="login-container">
    <div class="login-box">
      <el-menu class="me-title" :default-active="activeIndex"
               active-text-color="#409EFF" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">登录</el-menu-item>
        <el-menu-item index="2">注册</el-menu-item>
      </el-menu>
      <template v-if="isLogin">
        <el-form ref="loginForm" :key="1" status-icon :model="loginForm" :rules="loginRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="用户名" v-model="loginForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
          </el-form-item>

          <el-form-item label-width="0">
            <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>

      <template v-else>
        <el-form ref="registerForm" :key="2" status-icon :model="registerForm" :rules="registerRules"
                 label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="用户名" v-model="registerForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input placeholder="密码" type="password" show-password v-model="registerForm.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPassword">
            <el-input placeholder="确认密码" type="password" show-password v-model="registerForm.checkPassword"></el-input>
          </el-form-item>

          <el-form-item label-width="0">
            <el-button type="primary" @click="submitRegisterForm('registerForm')">注册</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>

    </div>
  </div>
</template>

<script>
  import {register, login} from "../api/login";

  export default {
    name: "Login",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码长度不小于6'))
        } else {
          if (this.registerForm.checkPassword !== '') {
            this.$refs.registerForm.validateField('checkPassword')
          }
          callback()
        }
      };

      const validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeIndex: '1',
        isLogin: true,
        //登录表单
        loginForm: {
          username: '',
          password: ''
        },
        //表单校验规则
        loginRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {max: 10, message: '不能大于20个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '不能少于6个字符', trigger: 'blur'}
          ]
        },
        registerForm: {
          username: '',
          password: '',
          checkPassword: ''
        },
        registerRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {max: 10, message: '不能大于20个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitLoginForm(formName) {
        let that = this;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('开始登录：' + JSON.stringify(that.loginForm));

            login(that.loginForm.username, that.loginForm.password).then(
              (data) => {
                console.log('登录成功……');
                that.$message({
                  type: 'success',
                  message: 'login success',
                  showClose: true
                });
                that.$router.push('/');
              }
            ).catch(error => {
              that.$message({
                message: error,
                type: 'error',
                showClose: true
              });
            })
          } else {
            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSelect(index, indexPath) {
        console.log('select:' + index + " indexPath:" + indexPath);
        this.isLogin = index === "1";
      },
      submitRegisterForm: function (formName) {
        let that = this;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('开始用户注册：' + JSON.stringify(that.registerForm));
            register(that.registerForm.username, that.registerForm.password, that.registerForm.checkPassword)
              .then(data => {
                console.log('注册成功');
                console.log(data);
                that.$message({
                  type: 'success',
                  message: 'register success',
                  showClose: true
                });
                //跳转登录页面
                that.$router.push('/login');
                that.activeIndex = '2';
                that.isLogin = true;
              })
              .catch(error => {

                that.$message({
                  type: 'error',
                  message: error,
                  showClose: true
                });

              });

          } else {
            return false;
          }
        });

      },
    }
  }
</script>

<style scoped>
  .me-title {
    width: 140px;
    margin: 0 auto 20px;
  }

  #login-container {
    position: fixed;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #EBEEF5;
  }

  .login-box {
    max-width: 480px;
    margin: 200px auto;
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import QuestionList from '@/views/QuestionList'
import QuestionView from '@/views/QuestionView'
import Profile from '@/views/Profile'
import store from '@/store'
import {Message} from 'element-ui'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'QuestionList',
          component: QuestionList
        },
        {
          path: '/profile/:username',
          name: 'Profile',
          component: Profile
        },
        {
          path: '/question/:questionId',
          name: 'QuestionView',
          component: QuestionView
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Login
    }
  ]
});

//判断是否登录，未登录跳转登录/注册页面
router.beforeEach((to, from, next) => {
    if (store.state.username.length === 0) {
      console.log('user not login' + ', to:' + to.path);
      if (to.path === '/login') {
        next();
      } else {
        next("/login");
      }
      return
    }

    if (store.state.username.length > 0) {
      console.log('in router: username length>0' + ', to:' + to.path);
      if (to.path === '/login') {
        next('/');
      }
      next();
    } else {
      console.log('to:' + to.path + 'from:' + from.path);
      //尝试获取用户信息
      store.dispatch('getInfoAboutMe')
        .then(data => {
          Message({
            type: 'success',
            message: data,
            showClose: true
          });
          next();
        })
        .catch(error => {
          //获取失败，未登录，跳转登录页
          next('/login');
          Message({
            type: 'error',
            message: error,
            showClose: true
          });
        });
    }

  }
);

export default router;

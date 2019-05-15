import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import QuestionList from '@/views/question/QuestionList'
import QuestionView from '@/views/question/QuestionView'
import Profile from '@/views/people/Profile'
import ProfileEdit from '@/views/people/ProfileEdit'
import store from '@/store'
import NotFound from '@/components/NotFound'
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
          path: 'people/edit',
          name: 'PeopleEdit',
          component: ProfileEdit,
        },
        {
          path: '/people/:username',
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
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

//判断是否登录，未登录跳转登录/注册页面
router.beforeEach((to, from, next) => {
    console.log('beforeEach -> to:' + to.path + 'from:' + from.path);

    if (to.path === '/login') {
      next();
      return
    }

    if (store.state.username.length > 0) {
      if (to.path === '/login') {
        next("/");
      } else {
        next();
      }
      return
    }


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
        console.log('user not login' + ',from:' + from.path + ', to:' + to.path);
        console.log(error);
        Message({
          type: 'warning',
          message: 'please login first',
          showClose: true
        });
        next('/login');
      });

  }
);

export default router;

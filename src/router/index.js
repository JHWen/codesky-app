import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import QuestionList from '@/views/QuestionList'
import QuestionView from '@/views/QuestionView'
import Profile from '@/views/Profile'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'QuestionList',
          component: QuestionList
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: '/question',
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
})

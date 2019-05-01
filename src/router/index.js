import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import QuestionView from '@/views/QuestionView'
import Profile from '@/views/Profile'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/question',
      name: 'Question',
      component: QuestionView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

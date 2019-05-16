import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import {login, logout, getUserInfo} from '../api/login'

Vue.use(Vuex);

//默认配置
axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;


export default new Vuex.Store({
  state: {
    id: 0,
    username: '',
    gender: 1,
    avatarUrl: '',
    headline: '',
    business: '',
    gmtCreate: '',
    gmtModified: '',
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_GENDER: (state, gender) => {
      state.gender = gender
    },
    SET_AVATAR: (state, avatarUrl) => {
      state.avatarUrl = avatarUrl
    },
    SET_HEADLINE: (state, headline) => {
      state.headline = headline
    },
    SET_BUSINESS: (state, business) => {
      state.business = business
    },
    SET_GMT_CREATE: (state, gmtCreate) => {
      state.gmtCreate = gmtCreate
    },
    SET_GMT_MODIFIED: (state, gmtModified) => {
      state.gmtModified = gmtModified
    },
  }, actions: {
    login: function ({commit}, loginForm) {
      //调用axios api登录后端
      return new Promise((resolve, reject) => {
        login(loginForm.username, loginForm.password)
          .then(data => {
            console.log('in store:login success');
            console.log(data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });

      });
    },
    logout: function ({commit}) {
      return new Promise((resolve, reject) => {
        logout()
          .then(data => {
            console.log('注销成功 in store');

            commit('SET_ID', 0);
            commit('SET_USERNAME', '');

            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getInfoAboutMe: function ({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(data => {
            console.log(data);
            const userInfo = data;
            commit('SET_ID', userInfo.id);
            commit('SET_USERNAME', userInfo.username);
            commit('SET_GENDER', userInfo.gender);
            commit('SET_AVATAR', userInfo.avatarUrl);
            commit('SET_HEADLINE', userInfo.headline);
            commit('SET_BUSINESS', userInfo.business);
            commit('SET_GMT_CREATE', userInfo.gmtCreate);
            commit('SET_GMT_MODIFIED', userInfo.gmtModified);

            resolve('success');
          })
          .catch(error => {
            reject(error);
          });
      })
    }
  }
})



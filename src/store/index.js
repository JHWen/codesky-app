import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex);

const SET_NAME = 'SET_NAME';
const SET_AVATAR = 'SET_AVATAR';
const SET_ID = 'SET_ID';

export default new Vuex.Store({
  state: {
    id: '007',
    name: '笑忆微凉',
    avatar: 'https://pic4.zhimg.com/7ce6c0d0629085cb9c632ea2b7e0b5d3_is.jpg',
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  }, actions: {
    logout: function ({commit}) {
      commit('SET_NAME', '');
    }
  }
})



import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex);

const SET_NAME = 'SET_NAME';
const SET_AVATAR = 'SET_AVATAR';
const SET_ID = 'SET_ID';

export default new Vuex.Store({
  state: {
    id: '',
    name: '',
    avatar: 'https://avatars2.githubusercontent.com/u/15610645?s=40&v=4',
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
  }, actions: {}
})



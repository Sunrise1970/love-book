import * as types from './types'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    userInfo (state) {
      return state.userInfo
    },
    refleshHome (state) {
      return state.refleshHome
    }
  },
  state: {
    userInfo: {},
    refleshHome: false,
    useRoute: ''
  },
  mutations: {
    [types.SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
    },
    [types.SET_REFLESH_HOME] (state, refleshHome) {
      state.refleshHome = refleshHome
    }
  },
  actions: {
    // 设置用户信息
    setUserInfo: ({ commit, state }, res) => {
      commit(types.SET_USER_INFO, res)
    },
    // 设置是否需要刷新首页
    setHomeReflesh: ({ commit, state }, res) => {
      commit(types.SET_REFLESH_HOME, res)
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { requestUserInfo } from '../api/user'
import { getMenuByRouter } from '../utils/util'
import routers from '../router/routers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      permissions: [],
      accessMenu: []
    },
    source: {
      token: null,
      cancel: null
    }
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, state.user.permissions)
  },
  mutations: {
    setUser (state, { user }) {
      state.user.name = user.name
      state.user.permissions = user.permissions
      state.user.accessMenu = user.accessMenu
    },
    deleteUser (state) {
      state.user.name = ''
      state.user.permissions = []
      state.user.accessMenu = []
    },
    updateSource (state, { source }) {
      state.source = source
    }
  },
  actions: {
    requestUserInfo (state, { commit }) {
      return requestUserInfo(state.source.token).then(user => {
        commit('setUser', { user })
      })
    }
  }
})

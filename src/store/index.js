import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCopy: false
  },
  mutations: {
    setIsCopy (state, value) {
      state.isCopy = value
    }
  },
  actions: {
    setIsCopy ({ commit }, value) {
      commit('setIsCopy', value)
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
// const api = 'https://next-phase.wahyudisetiaji.xyz'
const api = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: api,
    token: false
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {

  }
})

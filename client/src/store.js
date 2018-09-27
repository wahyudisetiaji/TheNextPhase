import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
const api = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: api,
    token: false,
    message: '',
    allTweet: '',
    myTweet: '',
    oneTweet: '',
    actions: ''
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setAllTweet (state, payload) {
      state.allTweet = payload
    },
    setMyTweet (state, payload) {
      state.myTweet = payload
    },
    setOneTweet (state, payload) {
      state.oneTweet = payload
    },
    setActions (state, payload) {
      state.actions = payload
    }
  },
  actions: {
    login (context, data) {
      axios({
        method: 'POST',
        url: `${api}/users/login`,
        data: {
          user: data.user,
          password: data.password
        }
      })
        .then((result) => {
          let token = result.data.data.token
          context.commit('setToken', true)
          localStorage.setItem('token', token)
          router.push('/')
        })
        .catch((err) => {
          if (err.response.data.message) {
            context.commit('setMessage', 'Email/Password wrong !')
          }
        })
    },
    logout (context) {
      context.commit('setToken', false)
      localStorage.clear()
      router.push('/')
    }
  }
})

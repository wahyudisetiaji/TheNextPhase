<template>
    <div>
         <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Twotter</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    </ul>
    <div class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" v-if="!token" v-model="user" placeholder="@username/Email" aria-label="Search">
      <input class="form-control mr-sm-2" type="text" v-if="!token" v-model="password" placeholder="Password" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" v-if="!token" type="button" @click="loginUser">Login</button>
      <button class="btn btn-outline-success my-2 my-sm-0" v-if="token" type="button" @click="logoutUser">Logout</button>
    </div>
  </div>
</nav>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      user: '',
      password: ''
    }
  },
  computed: {
    ...mapState([
      'token'
    ]),
    token: {
      get () {
        return this.$store.state.token
      },
      set (value) {
        this.$store.commit('setToken', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'logout'
    ]),
    loginUser () {
      let obj = {
        user: this.user,
        password: this.password
      }
      this.login(obj)
      this.user = ''
      this.password = ''
    },
    logoutUser () {
      this.logout()
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.token = true
    }
  }
}
</script>

<style>

</style>

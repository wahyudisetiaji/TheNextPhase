<template>
  <div class="home">
    <v-layout row wrap>
      <v-flex xs3>
        <ProfileAccount v-if="token" @data-user="user=$event"></ProfileAccount>
        <SearchTweet v-if="token"></SearchTweet>
        <ListFollowers :data="user" v-if="token"></ListFollowers>
      </v-flex>
      <v-flex xs6>
        <AddTweet v-if="token"></AddTweet><br>
        <AllTweet></AllTweet>
      </v-flex>
      <v-flex xs3>
        <ListFollowing v-if="token"></ListFollowing>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AddTweet from '@/components/AddTweet.vue'
import AllTweet from '@/components/AllTweet.vue'
import SearchTweet from '@/components/SearchTweet.vue'
import ProfileAccount from '@/components/ProfileAccount.vue'
import ListFollowers from '@/components/ListFollowers.vue'
import ListFollowing from '@/components/ListFollowing.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    AddTweet,
    AllTweet,
    SearchTweet,
    ProfileAccount,
    ListFollowers,
    ListFollowing
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
   created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.token = true
    }
  }
}
</script>

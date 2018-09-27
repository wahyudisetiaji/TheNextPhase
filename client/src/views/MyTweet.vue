<template>
  <div class="tweet">
    <h2>My Tweet</h2>
     <v-btn color="black" style="color:white" @click="home">Home</v-btn>
    <v-cointainer fluid v-for="(data, index) in myTweet" :key="index">
        <v-card class="card">
            <v-card-text>
                <div>
                    <h3>{{data.tweet}}</h3>
                    <h5>{{data.createdAt}}</h5>
                </div>
            </v-card-text>
            <v-card-text>
                <v-btn color="black" style="color:white" @click="deleteTweet(data._id)">Delete Tweet</v-btn>
            </v-card-text>
        </v-card>
    </v-cointainer>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  computed: {
      ...mapState([
          'baseURL',
          'myTweet',
          'actions'
      ]),
      myTweet: {
          get () {
              return this.$store.state.myTweet
          },
          set (value) {
              this.$store.commit('setMyTweet', value)
          }
      },
      actions: {
          get () {
              return this.$store.state.actions
          },
          set (value) {
              this.$store.commit('setActions', value)
          }
      },
  }, 
  methods: {
    getMyTweet () {
      axios({
        method: 'GET',
        url: `${this.baseURL}/tweets/mytweet`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
       .then((result) => {
         this.myTweet = result.data.result
       })
       .catch((err) => {
         console.log(err.response)
       })
    },
    deleteTweet (id) {
      axios({
        method: 'DELETE',
        url: `${this.baseURL}/tweets/deleteTweet/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((result) => {
        this.actions = result
      })
      .catch((err) => {
        console.log(err.response)
      });
    },
    home () {
      this.$router.push('/')
    }
  },
  created () {
    this.getMyTweet()
  },
  watch: {
    actions: function (newData, oldData) {
      if (newData) {
        this.getMyTweet()
      }
    }
  }
}
</script>

<style>
.tweet {
  padding: 2%
}
.card {
  margin: 3%
}
</style>


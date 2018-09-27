<template>
       <div class="tweet">
        <h2>All Tweet</h2>
        <v-container fluid v-for="(data, index) in allTweet" :key="index">
            <v-card>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-card-text>
                    <img class="rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" style="width:100px; height:100px"> 
                    </v-card-text>
                </v-flex>
                <v-flex xs8>
                    <v-card-text>
                        <span class="media-body twit-status">
                        <h5 class="mt-0">{{data.userId.name}}</h5>
                        <p>{{data.userId.username}}</p>
                        </span>
                        <h2>{{data.tweet}}</h2>
                    </v-card-text>
                </v-flex>
            </v-layout>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'baseURL',
      'allTweet',
      'actions'
    ]),
    allTweet: {
      get () {
        return this.$store.state.allTweet
      },
      set (value) {
        this.$store.commit('setAllTweet', value)
      }
    }
  },
  methods: {
    getAllTweet () {
        axios({
            method: 'GET',
            url: `${this.baseURL}/tweets`
        })
          .then((result) => {
            let data = result.data.result
            this.allTweet = data
          })
          .catch((err) => {
            console.log(err.response)
          })
    }
  },
  created () {
      this.getAllTweet()
  },
  watch: {
      actions: function(newData, oldData) {
          if (newData) {
              this.getAllTweet()
          }
      }
  }
}
</script>

<style>
.tweet {
    padding: 2%
}
</style>

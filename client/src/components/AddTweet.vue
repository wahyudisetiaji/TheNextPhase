<template>
    <div>
        <h2>Add Tweet</h2>
        <v-card>
            <v-card-text>
                <div>
                    <v-text-field name="tweet" v-model="tweet" placeholder="Tweet" id="id"></v-text-field>
                </div>
            </v-card-text>
            <v-card-text>
                <v-btn color="black" style="color:white" @click="addTweet">Add Tweet</v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    data () {
      return {
          tweet: '',
      }
    },
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
    },
     actions: {
      get () {
        return this.$store.state.actions
      },
      set (value) {
        this.$store.commit('setActions', value)
      }
    }
  },
    methods: {
        addTweet () {
            axios({
                method: 'POST',
                url: `${this.baseURL}/tweets/addtweet`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    tweet: this.tweet
                }
            })
              .then((result) => {
                 console.log(result)
                 this.tweet = ''
                 this.actions = result
              })
              .catch((err) => {
                  console.log(err.response)
              });
        }
    }
}
</script>

<style>

</style>

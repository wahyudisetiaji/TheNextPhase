<template>
        <div class="search">
            <h2>Search Tweet</h2>
            <v-flex xs12>
            <v-card class="search">
                <v-card-actions>
                    <v-text-field name="name" label="Search by Status" id="id" v-model="search"></v-text-field>
                </v-card-actions>
            </v-card>
            </v-flex>
        </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            search: ''
        }
    },
    computed: {
        ...mapState([
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
    watch: {
        search: function (newData, oldData) {
            if (newData) {
                let tweets = []
                this.allTweet.forEach(element => {
                    if (element.tweet.toLowerCase().indexOf(newData.toLowerCase()) > -1) {
                        tweets.push(element)
                    }
                })
                this.allTweet = tweets
            } else if (oldData) {

                this.actions = oldData
            }
        }
   }
}
</script>

<style>
.search {
    padding: 5%
}
</style>

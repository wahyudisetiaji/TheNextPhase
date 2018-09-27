<template>
     <div class="search">
            <h2>Profile</h2>
            <v-flex xs12>
            <v-card class="profile">
                <v-card-text>
                    <img class="rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" style="width:100px; height:100px"> 
                    <h3>{{user.name}}</h3>
                    <button @click="myTweet"><a href="#">{{user.username}}</a></button><br><br>
                    <h5>Tweet</h5><br>
                    <p>{{oneTweet.length}}</p>
                    <h5>Following</h5><br>
                    <p>{{user.following.length}}</p>
                    <h5>Follower</h5><br>
                     <p>{{user.followers.length}}</p>
                    <p></p>
                </v-card-text>
            </v-card>
            </v-flex>
        </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            user: ''
        }
    },
    computed: {
        ...mapState([
            'baseURL',
            'oneTweet',
            'actions'
        ]),
         oneTweet: {
            get () {
                return this.$store.state.oneTweet
            },
            set (value) {
                this.$store.commit('setOneTweet', value)
            }
        },
    },  
    methods: {
        getOneUser () {
            axios({
                method: 'GET',
                url: `${this.baseURL}/users`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.user = result.data.data
                this.$emit('data-user', this.user)
            })
            .catch((err) => {
                console.log(err.response)
            });
        },
        myTweet () {
            this.$router.push('/mytweet')
        },
        getOneTweet () {
            axios({
                method: 'GET',
                url: `${this.baseURL}/tweets/me`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.oneTweet = result.data.result
            })
            .catch((err) => {
                console.log(err.response)
            });
        }
    },
    created () {
        this.getOneUser()
        this.getOneTweet()
    },
    watch: {
        actions: function (newData, oldData) {
            if (newData) {
                this.getOneTweet()
            }
        }
    }
}
</script>

<style>

</style>

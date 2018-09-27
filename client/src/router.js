import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyTweet from './views/MyTweet.vue'
import Tweet from './views/Tweet.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tweet',
      name: 'tweet',
      component: Tweet
    },
    {
      path: '/mytweet',
      name: 'mytweet',
      component: MyTweet
    }
  ]
})

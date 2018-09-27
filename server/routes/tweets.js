var express = require('express');
var router = express.Router();
const { isLogin } = require('../middlewares/isLogin')
const { getTweet, addTweet, updateTweet, removeTweet, getOneTweet, getMyTweet } = require('../controllers/tweet-controller')

router.get('/', getTweet)
router.get('/me', isLogin, getOneTweet)
router.get('/mytweet', isLogin, getMyTweet)
router.post('/addtweet', isLogin, addTweet)
router.put('/updateTweet', updateTweet)
router.delete('/deleteTweet/:id', isLogin, removeTweet)

module.exports = router;
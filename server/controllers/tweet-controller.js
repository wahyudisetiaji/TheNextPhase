const Tweet = require("../models/tweet")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

module.exports = {
    getTweet: function (req, res) {

        Tweet.find({}).sort({createdAt: 'DESC'})
        .populate('userId')
        .then((result) => {

            res.status(200).json({
                message: 'All Tweets !',
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })

    },
    getMyTweet: function (req, res) {

        Tweet.find({userId: req.user._id}).sort({createdAt: 'DESC'})
        .populate('userId')
        .then((result) => {

            res.status(200).json({
                message: 'My Tweets !',
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })

    },
    getOneTweet: function (req, res) {

        Tweet.find({userId: req.user._id})
        .populate('userId')
        .then((result) => {

            res.status(200).json({
                message: 'One Tweets !',
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })

    },
    addTweet: function (req, res) {
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        User.findOne({_id: decode.id})
        .then((result) => {
            
            if (result._id.toLocaleString() == req.user._id.toLocaleString()) {

                Tweet.create({
                    tweet: req.body.tweet,
                    userId: req.user._id
                  })
                .then((result) => {
                    res.status(200).json({
                        message: 'Add tweet successfully !',
                        result
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });


            } else {

                res.status(400).json({
                    message: `your not authorized !`
                });

            }
            

        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            })

        });
       
    },
    removeTweet: function (req, res) {
        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        Tweet.findOne({userId: decode.id})
        .then((result) => {
            if (result.userId.toLocaleString() == req.user._id.toLocaleString()) {

                Tweet.deleteOne({_id: id})
                .then((result) => {

                    res.status(200).json({
                        message: 'Delete tweet successfully !',
                        result
                    })

                })
                .catch((err) => {
                    
                    res.status(400).json({
                        message: err.message
                    })

                });
            }

        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            })

        });

    },
    updateTweet: function (req, res) {

    }
}
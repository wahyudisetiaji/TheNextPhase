const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tweetSchema = new Schema({
    tweet: {
        type: String,
        required: [true, 'name is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

var Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet
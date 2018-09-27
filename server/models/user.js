const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    username: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format!']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User
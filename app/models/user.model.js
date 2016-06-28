var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
//
var userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    imgUrl: {
        type: String,
        default: 'avatar.png'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports =
    mongoose.model('User', userSchema);

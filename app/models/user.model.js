var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports =
mongoose.model('User', userSchema);

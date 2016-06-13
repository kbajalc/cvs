var mongoose = require( 'mongoose' );
var crypto = require('crypto');


var userSchema = new mongoose.Schema({
  email: String,
  // {
  //   type: String,
  //   // unique: true,
  //   // required: true
  // },
  name: String,
  // {
  //   type: String },
  // //  required: true
  // // },
  lastname: String,
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);

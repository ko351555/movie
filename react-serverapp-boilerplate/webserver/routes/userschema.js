var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* schema for user */
var userSchema = new Schema({
  
  username: String,

  password: String,
  
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;

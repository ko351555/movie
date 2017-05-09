const router = require('express').Router();
//const userCtrl = require('./userController');
const userModel = require('./userSchema');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;


var User = new userModel({"username":"admin","password":"admin"});
User.save();

module.exports = router;

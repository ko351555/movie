const router = require('express').Router();
//const userCtrl = require('./userController');
const userModel = require('./userSchema');
const userController = require('./userControl');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

/* adding details to user collection */

router.post('/login',
	passport.authenticate('local'),
	function(req, res) {
		res.json({responseText:'authenticated'});
	}
	);

module.exports = router;

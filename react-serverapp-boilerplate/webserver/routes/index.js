var express = require('express');
var router = express.Router();
var Movie=require('./movieSchema');
var user = require('./userschema');

/* GET users listing. */
function loggedIn(req,res,next){
	var User=new user(req.body)
	if(req.isAuthenticated()) {
		next();
	}
	else {
		res.send({"responseText":"Not Authenticated"});
	}
}
var User = new user({"username":"kowsi","password":"admin"});
User.save(function(err,data){
	if(err)
		{console.log(err)}
	else
		{console.log(data)}
});



router.get('/', function(req, res, next) {
	res.send('got from server');
});

router.post('/add',loggedIn,function(req,res,next)
{
	var movie=new Movie(req.body);

	movie.save(function(err,data){
		if(err)
			{res.send(err)}
		else
		{
			res.send({'success':'Data is saved successfully'});
		}
	});
});

router.get('/display',loggedIn,function(req,res){
	console.log("hello");
	Movie.find({},function(err,data){
		if(err)
			res.send(err);
		else {

			res.send(data);
		}
	});
});

router.put('/update',loggedIn,function (req,res) {


	Movie.update({_id:req.body.id},{$set:{comments:req.body.comments}},function (err,data) {
		if(err)
			res.send(err);
		else {
			res.send({'success':'Data is Updated successfully'});
		}
	})
});



router.delete('/delete',loggedIn,function (req,res) {



	Movie.remove({_id:req.body.id},function (err,data) {
		if(err)
			res.send(err);
		else {

			res.send({'success':'Data is deleted successfully'});
		}
	});
});

module.exports = router;
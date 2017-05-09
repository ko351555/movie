var express = require('express');
var router = express.Router();
var Movie=require('./movieSchema');
var user = require('./userschema');

var User = new user({"username":"admin","password":"admin"});
User.save();

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.send('got from server');
});

router.post('/add',function(req,res,next)
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

router.get('/display',function(req,res){
  Movie.find({},function(err,data){
    if(err)
      res.send(err);
    else {
     res.send(data);
   }
 });
});

router.put('/update',function (req,res) {
	
  Movie.update({_id:req.body.id},{$set:{comments:req.body.comments}},function (err,data) {
    if(err)
      res.send(err);
    else {
      res.send({'success':'Data is Updated successfully'});
    }
  })
});



router.delete('/delete',function (req,res) {

  console.log(req.body);

  Movie.remove({_id:req.body.id},function (err,data) {
    if(err)
      res.send(err);
    else {

     res.send({'success':'Data is deleted successfully'});
   }
 });
});

module.exports = router;



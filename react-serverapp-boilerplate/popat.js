var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var index = require('./webserver/routes/index');
var users = require('./webserver/routes/users');
var app = express();
var compiler = webpack(config);
var passport = require('passport');
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy;
var User = require('./webserver/routes/userschema');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));

app.use(session({
  secret: "keyboard cat",
    // name: "admin",
    // store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log("serializeUser..",user)
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id,function(err, user){
    if(err)
    {
      done(null,err);
    }
    else {
      done(null, user);
    }
  })
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      console.log("out side if block", user);
      if (err) {  return done(err); }
      if (!user)
      {
        return done(null, false, { message: 'Incorrect username.' });

      }
      if (!user.password == password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
  ));

app.post('/login',
  passport.authenticate('local'),function(req,res){
    console.log('Login Session created in passport');

    res.send({"responseText":"Authenticated"});
  }

  );

app.get('/logout', function(req, res) {
  console.log('Logout Session deleted');
  req.session.destroy();
  res.send({redirect: '/'});
});


//Mongoose
var db = 'mongodb://localhost/movies';
mongoose.connect(db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connnected with mongo");
});



//Ruotes
app.use('/', index);
app.use('/stream',users);


app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));

app.use(webpackHotMiddleware(compiler));



//Listening to port 8081
app.listen(8080, '0.0.0.0', function(err, result) {
  if (err) {
    console.error("Error ", err);
  }

  console.log("Server started at 8080");
});
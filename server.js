// require express framework and additional modules
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
  mongoose = require('mongoose'),
  session = require('express-session');

var User = require('./models/user');

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	saveUnitialized: true,
	resave: true,
	secret: "SuperSecret",
	cookie: { maxAge: 60000}
}));
mongoose.connect('mongodb://localhost/simple-login');


// signup route with placeholder response
// app.get('/signup', function (req, res) {
//   res.send('coming soon');
// });

// login route (renders signup view)
app.get('/signup', function (req, res) {
  res.render('signup');
});

// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
});


// post route for sign up form
app.post('/users', function(req,res){
	User.createSecure(req.body.email, req.body.password, function(err, user) {
		req.session.userId = user.id;
		console.log(req.body);
		res.json(user);
		console.log(user);
	});
});



// post route for log in page
app.post('/login', function(req,res){
	User.authenticate(req.body.email, req.body.password, function(err, user) {
			console.log("Server js : " + user);
			req.session.userId = user.id;
			if (user) {
				// res.json(user);
				res.redirect('/profile');
			} else {
				console.log("user doesn't exist");
			}
	});
});

// rendering the user's profile page. 
app.get('/profile', function (req,res){
	User.findOne({_id: req.session.userId}, function (err, user){
		res.render('user-show', {user:user});
	});
});


// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});




















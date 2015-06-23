// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
// static content 
app.use(express.static(path.join(__dirname, "/public")));
// setting up ejs and our views folder
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
	console.log("listening on port 8000");
})
var routes = require('./routes/routes.js')(app, server);


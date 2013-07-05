
var express = require('express');

var fs=require('fs')

var home = require('./home.js');
//var util = require('csv');

function User (username, surname) {
	this.username = username;
}

user = new User('test','test1');

var port = process.env.PORT || 5000;
console.log("Starting Server on port "+port);

var app = express.createServer(express.logger());

app.set('title','coursera');
app.get('/', home.home);
app.get('/test', home.users);

app.listen(port, function() {
  console.log("Listening on " + port);
});
console.log("App started.");


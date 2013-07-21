// coursera startup - bitstarter

var express = require('express');
var home = require('./controller.js'); 

var port = process.env.PORT || 8080;
console.log("Starting Server on port "+port);

var app = express.createServer(express.logger());

app.set('title','coursera-bitstarter');
app.get('/', home.home);
app.get('/test', home.info);

app.listen(port, function() { console.log("Listening on " + port); });

console.log("App started.");


// coursera startup - bitstarter

var express = require('express')
  , http = require('http')
  , path = require('path');

process.env.PWD = process.cwd()

var home = require('./controller.js'); 

var port = process.env.PORT || 8080;
console.log("Starting Server on port "+port);

var app = express.createServer(express.logger());


//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(process.env.PWD, 'public'))); //__dirname
//app.use('/heatcanvas',express.static(process.env.PWD+'/heatcanvas'));

app.set('title','coursera-bitstarter');
app.get('/', home.home);
app.get('/test', home.info);

app.listen(port, function() { console.log("Listening on " + port); });

console.log("App started.");


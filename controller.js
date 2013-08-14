var filename = "index.html"
var	IDEAS_DEFAULT = "ideas.yaml";	


var fs=require('fs');
//var less = require('less'); // better pre-compile

var yaml = require('js-yaml'),
    path=require('path'),
	fs   = require('fs'),
	util = require('util');

var loadText= function(fn) {
//	var s = fs.readFileSync(checksfile);
//    return JSON.parse(s);
	try {
		  var filename = path.join(__dirname, fn),
		      contents = fs.readFileSync(filename, 'utf8'),
		      data     = yaml.load(contents);

		  //console.log(util.inspect(data, false, 10, true));
		} catch (err) {
		  console.log(err.stack || String(err));
		}


//	try {
//		var s = fs.readFileSync(fn).toString();
//		var doc = yaml.eval(s);
//	} catch (e) {
//		  console.log(e);
//	}
    return data;
};


//Get document, or throw exception on error


// assignement 3_1
exports.home = function (request, response) {
	var s = fs.readFileSync(filename).toString()
	var o = loadText(IDEAS_DEFAULT);
	//console.log(o.xhelp);
	//for ( var int = 0; int < o.length; int++) {
		//console.log(o[int].id+": "+o[int].sentence+" = "+o[int].section0);
	//} 
	for (var property in o.H24HR) {
	    if (o.H24HR.hasOwnProperty(property)) {
	    	s = s.replace("{"+property+"}", o.H24HR[property]);
	    }
	}
	s = s.replace("{title}",o.H24HR.title);
	s = s.replace("{n}","10");
	s = s.replace("{target}","1000");
	s = s.replace("{amount}","100");
	s = s.replace("{days}","15");
	s = s.replace("{backers}","2");
	s = s.replace("{copy}","Copyright Avidys 2013");
    response.send(s);
}

// some experiment
exports.info = function (request, response) {
  response.writeHead(200,{"Content-Type": "text/html"});
  response.write('Welcome: '+request);
  response.write('<li>'+request.host+'</li>');
  response.write('<li>'+request.request+'</li>');
  response.write('<li>'+request.path+'</li>');
  response.end();
}


if(require.main == module) {
	//console.log(loadText(IDEAS_DEFAULT));
	var o = loadText(IDEAS_DEFAULT);
	console.log(o.xhelp.id);
	//for ( var int = 0; int < o.length; int++) {
	//	console.log(o[int].id+": "+o[int].sentence);
	//} 
	for (var p in o) 
		console.log(p.id+": "+p.sentence+" - "+p.title);
	for (var property in o.H24HR) {
	    if (o.H24HR.hasOwnProperty(property)) {
	   	console.log(property);
	    }
	}
   	console.log(o.H24HR.title);
}

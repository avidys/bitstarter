
var less = require('less'); // better pre-compile
var filename = "index.html"

IDEAS_DEFAULT = "ideas.yaml";	

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
	var s = fs.readFileSync(filename)
    response.send(s.toString());
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
	for ( var int = 0; int < o.length; int++) {
		console.log(o[int].product+": "+o[int].sentence);
	} 
	
}
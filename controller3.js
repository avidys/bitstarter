
var fs=require('fs');
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
	var s = fs.readFileSync(filename).toString()
	var o = loadText(IDEAS_DEFAULT);
	//console.log(o.xhelp);
	//for ( var int = 0; int < o.length; int++) {
		//console.log(o[int].id+": "+o[int].sentence+" = "+o[int].section0);
	//} 
	s = s.replace("{title}",o.xhelp.id);
	s = s.replace("{id}",o.xhelp.id);
	s = s.replace("{sentence}",o.xhelp.sentence)
	s = s.replace("{section0]",o.xhelp.section0)
	s = s.replace("{section1]",o.xhelp.section1)
	s = s.replace("{section2}",o.xhelp.section2)
	s = s.replace("{section3}",o.xhelp.section3)
	s = s.replace("{faq_q1}",o.xhelp.faq_q1)
	s = s.replace("{faq_a1}",o.xhelp.faq_a1)
	s = s.replace("{faq_q2}",o.xhelp.faq_q2)
	s = s.replace("{faq_a2}",o.xhelp.faq_a2)
	s = s.replace("{faq_q3}",o.xhelp.faq_q3)
	s = s.replace("{faq_a3}",o.xhelp.faq_a3)
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
	for ( var int = 0; int < o.length; int++) {
		console.log(o[int].id+": "+o[int].sentence+" = "+o[int].section0);
	} 
	
}

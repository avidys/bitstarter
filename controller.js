
var fs=require('fs');
var filename = "index.html"

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



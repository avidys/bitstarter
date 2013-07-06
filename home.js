var fs=require('fs');
var filename = "index.html"

exports.home = function (request, response) {
    response.send("Hello toi!");
}

exports.home1 = function (request, response) {
	var s = fs.readFileSync(filename, [options])
    response.send(s);
}


exports.info = function (request, response) {
//  response.send('Hello you: '+request.path+'<p>');
  response.writeHead(200,{"Content-Type": "text/html"});
  response.write('Welcome: '+request);
  response.write('<li>'+request.host+'</li>');
  response.write('<li>'+request.request+'</li>');
  response.write('<li>'+request.path+'</li>');
  response.end();
}

//var pg = require('pg');

exports.users = function (request, response) {
	  response.writeHead(200,{"Content-Type": "text/html"});
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		  var query = client.query('SELECT * FROM users');

		  query.on('row', function(row) {
			  response.write('<li>'+row+'</li>');
 		      console.log(JSON.stringify(row));
		  });
		});


//  for ( var i = 0; i < 10; i++) {
//	  response.write('<li>'+i+'</li>');
//  }
  response.end();
	
}




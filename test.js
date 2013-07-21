// some testing on stuff

//var util = require('csv');
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



function User (username, surname) {
	this.username = username;
}

user = new User('test','test1');


var Person = function( firstName, lastName ) {
	  this.firstName = firstName;
	  this.lastName = lastName;
	  return this;
	};

	Person.prototype = {
	  isMarried : false,
	  hasKids: false
	};

var john = new Person( "John", "Smith" ),
    linda = new Person( "Linda", "Davis" ),
	name;

john.isMarried = true;

console.log( "Not Checking hasOwnProperty" );
for ( name in john ) {
	  console.log( name + ": " + john[name] ); 
	  //Outputs
	  //  firstName: John 
	  //  lastName: Smith
	  //  isMarried: true
	  //  hasKids: false
}

console.log( "Checking hasOwnProperty" );
for ( name in linda ) {
  if ( linda.hasOwnProperty(name) ) {
	    console.log( name + ": " + linda[name] ); 
	    //Outputs
	    //  firstName: Linda
	    //  lastName: Davis
	  }
	}    
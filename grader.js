#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var fs = require('fs'),
program = require('commander'),
cheerio = require('cheerio'),
HTMLFILE_DEFAULT = "index.html",
URL_DEFAULT = "http://coursera-bitstarter.herokuapp.com/",
CHECKSFILE_DEFAULT = "checks.json",
sys = require('util'),
rest = require('restler');

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s not found.", instr);
    	console.log("Exiting.");
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};


var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(content, checksfile) {
    $ = cheerio.load(content);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};



var readUrl = function(url, checkFunc, checks) {
    rest.get(url).on('complete', function(result, response) {
	//console.log (response.statusCode);
	//console.log (result);

    if (result instanceof Error) {
      console.log("%s not accessible.", url);
      console.log('Error: ' + result.message);
	  console.log("Exiting.");
      process.exit(1);
      // this.retry(5000); // try again after 5 sec
    } 
    else if (response.statusCode != 200) {
  	  console.log("%s not accessible.", url);
  	  console.log('Error code: ' + response.statusCode);
  	  console.log("Exiting.");
  	  process.exit(1);
  	}
    else {
      //console.log ("OK");
      checkFunc (result, checks);
    }
  });
}

// run it
var performCheck = function (content , checks) {
  var checkJson = checkHtmlFile(content , checks);
  var outJson = JSON.stringify(checkJson, null, 4);
  console.log(outJson);
}


if(require.main == module) {
    program
        .version('0.0.1')
//        .command('grader -f | -u')
        .usage('HTML grader\n\t Asserts tags presence in a local or remote html file.\n\t Tags are read form a local json file.')
        .option('-c, --checks <check_file>', 'Path to json file (defaulted to '+CHECKSFILE_DEFAULT+')', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-f, --file <html_file>', 'Path to local html file')
        .option('-u, --url <url>', 'Remote html file URL');
    
    program.on('--help', function(){
    	console.log('  Examples:');
    	console.log('');
    	console.log('    $ grader.js --help');
    	console.log('    $ grader.js -c checks-test-1.json -f test1.html');
    	console.log('    $ grader.js -c checks-test-2.json -f test2.html');
    	console.log('');
    });

    program.parse(process.argv);

    
    //console.log(program);
    //if (!program.args.length) program.help();
    assertFileExists(program.checks); // to ensure checks file actually exists
    if (program.url == null && program.file == null) {
        console.log('Please provide either --file or --url');
        program.help();
    } 
    if (program.url && program.file ) {
        console.log('Please provide either --file or --url but not both');
        process.exit(1);
    } 

    var content = "";
    if (program.file) {
        if (assertFileExists(program.file)) {// to ensure default file actually exists
          content = fs.readFileSync(program.file);
          performCheck(content , program.checks)
        }
    }
    if (program.url)
     	readUrl(program.url, performCheck, program.checks);

} else {
    exports.checkHtmlFile = checkHtmlFile;
}
/*
 *Primary File for the Api
 *
 */

//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests within a string
const server = http.createServer(function(req, res) {

    // Get the URL and parse it

    const parsedUrl = url.parse(req.url,true); // This is the request object
    
    // Get the path

    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Get the query string as an object

    const queryStringObject = parsedUrl.query;

    // Get HTTP method

    const method = req.method.toLowerCase();

    // GET the headers as an object

    const headers = req.headers;

    // Get the USER's payload, if any...
    // Side note ***Found that the variables decoder and buffer did not like being called const. They gave issues when using postman checking operation of things here***

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end', function(){
        buffer += decoder.end();
        // Send the response
    
        res.end('Hello World\n');

        // Log the request path

        console.log('Request receieved with this payload: ',buffer)
    });

    

    
});

// Start the server, and have it listen on PORT 3000
server.listen(3000, function(){
    console.log("The server is listening on PORT 3000")
})
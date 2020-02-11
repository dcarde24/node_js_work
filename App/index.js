/*
 *Primary File for the Api
 *
 */

//Dependencies
const http = require('http');
const url = require('url');

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

    // Send the response
    
    res.end('Hello World\n');

    // Log the request path

    console.log('Request receieved on path: ' + trimmedPath + ' with method: ' + method + ' and with these query string parameters' , queryStringObject)

    
});

// Start the server, and have it listen on PORT 3000
server.listen(3000, function(){
    console.log("The server is listening on PORT 3000")
})
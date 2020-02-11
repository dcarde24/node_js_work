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

    const parsedurl = url.parse(req.url,true);
    
    // Get the path

    const path = parsedurl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'')

    // Send the response
    
    res.end('Hello World\n');

    // Log the request path

    console.log('Request receieved on path: ' + trimmedPath)

    
});

// Start the server, and have it listen on PORT 3000
server.listen(3000, function(){
    console.log("The server is listening on PORT 3000")
})
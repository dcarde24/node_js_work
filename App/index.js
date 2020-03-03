/*
 *Primary File for the Api
 *
 */

//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

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

        // Choose the handler this request should go to. If one is not found, use handler
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

        // Construct the data object
        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler or default
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);
            
            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path

            console.log('Returning this response: ', statusCode, payloadString);
        });
    });
});

// Start the server/dynamically calling the port after requiring config
server.listen(config.port, function(){
    console.log("The server is listening on PORT " + config.port + " in " + config.envName + " mode");
});

// Define the handler
const handlers = {};

// Sample handler for operation check
handlers.sample = function(data, callback) {
    // Callback a http status code, and a payload object
    callback(406,{'name' : 'sample handler'});
};

// Define handler not found
handlers.notFound = function(data, callback) {
    callback(404);
};

// Define the request router
const router = {
    'sample' : handlers.sample
};






// After running the program after building the handlers. Used postman and found that postman was able to return the 404 not found with an empty object
var http = require('http');
var handler = require('./src/handler.js');
require('dotenv').config();

var server = http.createServer(handler);

server.listen(5000, function () {
    console.log("Server is listening on port 5000.  Ready to accept requests!");
});
var http = require('http');
var handler = require('./src/handler.js');
require('dotenv').config();

var server = http.createServer(handler);

server.listen(process.env.PORT || 5000, function () {
    console.log("Server has started");
});
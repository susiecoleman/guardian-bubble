var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var weatherForecast = require('./weather.js')

var server = http.createServer(handler);

function handler (request, response) {
    var endpoint = request.url;
    if (endpoint === "/") {
        sendResponse(response, "index.html", "text/html")
    } else if(endpoint === "/weather"){
        processWeatherRequest(request, response);
    }
     else if(endpoint.includes(".css")){
        sendResponse(response, endpoint, "text/css")  
    }
    else {
        sendResponse(response, endpoint, "application/javascript")     
    }
}

function processWeatherRequest(request, response) {
    var data = '';
    request.on('data', function (dataChunk) {
        data += dataChunk;
    });
    request.on('end', function () {
        var convertedData = querystring.parse(data);
        weatherForecast(convertedData.weather)
            .then(weather => {
                response.writeHead(302, {"Location": "/"});
                response.end();
            });
    });
}

function sendResponse(response, fileName, contentType) {
    fs.readFile(__dirname + '/public/' + fileName, function(error, file) {
        if (error) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("Resource not found");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": contentType});
            response.end(file);
        }
    });
}

server.listen(3000, function () {
    console.log("Server is listening on port 3000.  Ready to accept requests!");
});
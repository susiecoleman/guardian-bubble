var fs = require('fs');
var url = require('url');
var weatherForecast = require('./weather.js')

function handler (request, response) {
    var endpoint = request.url; 
    if (endpoint === "/") {
        sendResponse(response, "index.html", "text/html")
    } else if(endpoint.startsWith("/weather")){
        var location = url.parse(endpoint, true).query.location;
        processWeatherRequest(response, location);
    }
     else if(endpoint.includes(".css")){
        sendResponse(response, endpoint, "text/css")  
    }
    else {
        sendResponse(response, endpoint, "application/javascript")     
    }
}

function processWeatherRequest(response, location) {
    weatherForecast(location)
        .then(weather => {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(weather);
            response.end();
        });
}

function sendResponse(response, fileName, contentType) {
    fs.readFile(__dirname + '/../public/' + fileName, function(error, file) {
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

module.exports = handler;
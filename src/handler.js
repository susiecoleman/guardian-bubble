var fs = require('fs');
var url = require('url');
var weatherForecast = require('./weather.js');
var guardian = require("./guardian.js");
var kathResponse = require("./kath");

function handler (request, response) {
    var endpoint = request.url; 
    if (endpoint === "/") {
        sendResponse(response, "index.html", "text/html")
    } else if(endpoint.startsWith("/weather")){
        var location = url.parse(endpoint, true).query.location;
        sendWeatherResponse(location, response);
    } else if(endpoint.startsWith("/content")){
        var params = url.parse(endpoint, true).query
        sendGuardianResponse(params, response);
    } else if(endpoint.startsWith("/gallery")){
        var params = url.parse(endpoint, true).query
        sendGuardianGalleryResponse(params, response);
    } else if(endpoint.startsWith("/kath")){
        var data = '';
        request.on('data', function (chunk) {
            data += chunk;
        });
        request.on('end', function () {
            sendKathResponse(data, response);    
        });
    } else if(endpoint.includes(".css")){
        sendResponse(response, endpoint, "text/css")  
    }
    else {
        sendResponse(response, endpoint, "application/javascript")     
    }
}

function sendKathResponse(data, response) {
    var json = JSON.parse(data);
    kathResponse(json.rant).then(
        kath => {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(kath);
            response.end();
        }
    );
}

function sendGuardianGalleryResponse(params, response) {
    guardian.getGuardianGallery(params)
        .then(guardian => {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(guardian));
                response.end();
            }
        );
}

function sendGuardianCartoonResponse(params, response) {
    guardian.getGuardianCartoon(params)
        .then(guardian => {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(guardian));
                response.end();
            }
        );
}

function sendGuardianResponse(params, response) {
    guardian.getGuardianContent(params)
        .then(guardian => {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(guardian));
                response.end();
            }
        );
}

function sendWeatherResponse(location, response) {
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
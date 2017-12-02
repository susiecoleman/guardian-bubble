var fetch = require("node-fetch");

function processWeather(response){
    response.body;
}

function weatherForecast(location) {
    var url = "http://api.openweathermap.org/data/2.5/weather?APPID=" + process.env.WEATHER_API_KEY + "&units=metric&q=" +location;
    return fetch(url)
        .then(function(response){
            return response.json()
        })
        .then(function(json){
            var temp = json.main.temp;
            var weatherId = json.weather[0].id;
            var description = generateDescription(weatherId, json.weather[0].description);
            var htmlResponse = '<h3 class="box--subheader blue interactive_box--subheader">' + description + '</h3>\
            <h3 class="box--subheader dark_grey interactive_box--subheader">' + location + '</h3>\
            <h4 class="blue box--text interactive_box--text">Temperature: ' + temp + ' <sup>o</sup>C</h4>\
            <button class="box--submit_button" onclick="resetWeatherBox()">Get the forecast</button>';
            return htmlResponse;
        });
}

function generateDescription(weatherId, defaultDescription) {
    var description = defaultDescription;
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            description = "Thundery weather ahead fingers crossed Donald Trump is out for a round of golf."
            break;
        case (weatherId >= 300 && weatherId < 500):
            description = "Drizzle is forecast. Why can't it just rain or not rain? There's already enough uncertanty with Brexit without the weather joining in."
            break;
        case (weatherId >= 500 && weatherId < 600):
            description = "It's raining. The Daily Mail is blaming Europe for it but you know it's Trump's fault. It never rained when Obama was president."
            break;
        case (weatherId >= 600 && weatherId < 700):
            description = "It's snowing. If you do make it into work today make sure you counteract this productivity by telling everyone about your commute in extensive detail."
            break;
        case (weatherId >= 700 && weatherId < 800):
            description = "Poor visibility today. You won't be able to see very far ahead of you (just like May's Brexit negotiation team)."
            break;
        case (weatherId == 800):
            description = "Today will be clear. You should probably go out for brunch. Don't forget to instagram it otherwise what's the point of going?"
            break;
        case (weatherId > 800 && weatherId < 900):
            description = "Wordsworth may have wandered lonely as a cloud but there's going to be loads of clouds today so they'll have plenty of company."
            break;
        case (weatherId >= 900):
            description = "Extreme weather forecast. Best to stay inside and tell people on twitter how outrageous it is people refuse to beleive in global warming."
            break;
        default:
            break;
    }
    return description;
}

module.exports = weatherForecast;
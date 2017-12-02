var currentImage = 1;
var numOfImages = 0;
var images = [];

$(document).ready(function() {
    resetKathBox();
    resetWeatherBox()
    getRecipe();
    getBook();
    getTv();
    getCartoon();
    getReview();
    getPodcast();
    getPhotos();
});

function getAsset(assets) {
    var asset = "";
    var assetFound = false;
    var counter = 0;
    while(counter < assets.length && !assetFound) {
        var currentAsset = assets[counter];
        if(currentAsset.typeData.height >= 400) {
            asset = currentAsset.file;
            assetFound = true;
        }
        counter++;
    }
    return asset;
}

function getRecipe() {
    $.ajax({
        url: "https://content.guardianapis.com/search",
        data: {"api-key":"gnm-hackday-2017", "tag": "tone/recipes", "show-fields": "headline,thumbnail", "page-size": 1, "show-elements":"image"}
    }).then(function(data) {
        var headline = data.response.results[0].fields.headline;
        var images = data.response.results[0].elements[0].assets;
        var image = getAsset(images);
        var url = data.response.results[0].webUrl;
       $("#eat_headline").text(headline);
       $("#eat_link").attr("href", url);
       $("#eat_image").attr("src", image);
    });
}

function getBook() {
    $.ajax({
        url: "https://content.guardianapis.com/search",
        data: {"api-key":"gnm-hackday-2017", "tag": "books/series/book-of-the-day", "show-fields": "headline,thumbnail", "page-size": 1, "show-elements":"image"}
    }).then(function(data) {
        var headline = data.response.results[0].fields.headline;
        var images = data.response.results[0].elements[0].assets;
        var image = getAsset(images);
        var url = data.response.results[0].webUrl;
       $("#read_headline").text(headline);
       $("#read_link").attr("href", url);
       $("#read_image").attr("src", image);
    });
}

function getTv() {
    $.ajax({
        url: "https://content.guardianapis.com/search",
        data: {"api-key":"gnm-hackday-2017", "tag": "culture/series/watchthis", "show-fields": "headline,thumbnail", "page-size": 1, "show-elements":"image"}
    }).then(function(data) {
        var headline = data.response.results[0].fields.headline;
        var images = data.response.results[0].elements[0].assets;
        var image = getAsset(images);
        var url = data.response.results[0].webUrl;
       $("#watch_headline").text(headline);
       $("#watch_link").attr("href", url);
       $("#watch_image").attr("src", image);
    });
}

function getCartoon() {
    $.ajax({
        url: "https://content.guardianapis.com/search",
        data: {"api-key":"gnm-hackday-2017", "tag": "commentisfree/series/guardian-comment-cartoon", "show-fields": "headline,thumbnail", "page-size": 1, "show-elements":"image"}
    }).then(function(data) {
        var headline = data.response.results[0].fields.headline;
        var images = data.response.results[0].elements[0].assets;
        var image = getAsset(images);
        var url = data.response.results[0].webUrl;
       $("#cartoon_headline").text(headline);
       $("#cartoon_link").attr("href", url);
       $("#cartoon_image").attr("src", image);
    });
}

function getReview() {
    $.ajax({
        url: "https://content.guardianapis.com/search",
        data: {"api-key":"gnm-hackday-2017", "tag": "tone/reviews", "show-fields": "headline,thumbnail", "page-size": 1, "show-elements":"image"}
    }).then(function(data) {
        var headline = data.response.results[0].fields.headline;
        var images = data.response.results[0].elements[0].assets;
        var image = getAsset(images);
        var url = data.response.results[0].webUrl;
       $("#do_headline").text(headline);
       $("#do_link").attr("href", url);
       $("#do_image").attr("src", image);
    });
}

function getPodcast() {
    $.ajax({
        url: "https://content.guardianapis.com/search",
        data: {"api-key":"gnm-hackday-2017", "tag": "type/audio,type/podcast", "show-fields": "headline,thumbnail", "page-size": 1, "show-elements":"image"}
    }).then(function(data) {
        var headline = data.response.results[0].fields.headline;
        var images = data.response.results[0].elements[0].assets;
        var image = getAsset(images);
        var url = data.response.results[0].webUrl;
       $("#podcast_headline").text(headline);
       $("#podcast_link").attr("href", url);
       $("#podcast_image").attr("src", image);
    });
}

function getPhotos() {
    $.ajax({
        url: "https://content.guardianapis.com/search",
        data: {"api-key":"gnm-hackday-2017", "tag": "news/series/ten-best-photographs-of-the-day", "show-elements" : "image", "page-size": 1, "show-fields": "headline"}
    }).then(function(data) {
        images = data.response.results[0].elements;
        numOfImages = images.length;
        url = data.response.results[0].webUrl;
        $("#gallery_link").attr("href", url);
        imageRotator();
        window.setInterval(imageRotator, 20000);
    });
}

function imageRotator() {
    var image = images[currentImage].assets[1].file;
    var caption = images[currentImage].assets[1].typeData.caption;
    currentImage++;
    if (currentImage >= numOfImages) {
        currentImage = 1;
    }
    $("#gallery_image").attr("src", image);
    $("#image_caption").html(caption);
}

function resetKathBox() {
    $("#kath_box").empty();
    $("#kath_box").append(
        '<textarea class="box--input_field" id="rant" placeholder="What\'s on your mind?"></textarea>\
        <button class="box--submit_button" onclick="kathResponse()">ARRRRGH!</button>\
        <h3 class="box--subheader blue interactive_box--subheader">My liberal rants</h3>'
    )
}

function kathResponse() {
    var rant = $("#rant").val();
    $("#kath_box").empty();
    $.post(
        'https://apiv2.indico.io/keywords?version=2',
        JSON.stringify({
          'api_key': "f3e1407b9a098a62edc7fa954dc52f1d",
          'data': rant,
          'threshold': 0.1
        })
      ).then(function(keywordsResponse) {
        var keywordsJson = $.parseJSON(keywordsResponse)
        var word = Object.keys(keywordsJson.results)[0];
        $.post(
            'https://apiv2.indico.io/sentimenthq?version=2',
            JSON.stringify({
              'api_key': "f3e1407b9a098a62edc7fa954dc52f1d",
              'data': rant,
              'threshold': 0.1
            })
        ).then(function(emotionResponse){
            var emotionJson = $.parseJSON(emotionResponse)
            var emotion = emotionJson.results;
            $("#kath_box").append('<h3 class="box--subheader blue interactive_box--subheader">Reassuring Kath Viner</h3>');
            $("#kath_box").append('<img class="box--image-full_width_image" src="Katherine-Viner.png" />');
            $("#kath_box").append('<p class="box--text interactive_box--text dark_grey">' + kathResponseSentence(rant, word, emotion) + '</p>');
            $("#kath_box").append('<button class="box--submit_button box--submit_button-margin_bottom" onclick="resetKathBox()">But wait there\'s more</button>');
        });         
    }); 
}

function kathResponseSentence(rant, word, emotion) {
    var response  = "You seem passionate about " + word + ". It is great to hear about issues that are important to you."
    if(rant.toLowerCase().indexOf("brexit") !== -1) {
        response = "Don't even talk to me about Brexit. What a shambles."
    } else {
        if(emotion < 0.5) {
            response = "You seem upset about " + word + ". This is a totally valid view and you are totally in the right.";
        } 
    }
    return response;
}

function jeremyTime() {
    $("#twitter-box").empty();
    $("#twitter-box").append(
        '<img class="box--image-full_width_image" src="jeremy2.jpg" />'
    );
    $("#twitter-box").append(
        '<p class="box--text-default_layout box--text interactive_box--text dark_grey">\
            Jeremy Corbyn often takes a break from twitter to do some gardening. Maybe you should take a break from it too...\
        </p>'
    );
}

function resetWeatherBox() {
    $("#weather_box").empty();
    $("#weather_box").append(
        '<textarea id="weather" class="box--input_field" placeholder="Search by city... (but lets face it, it\'s probably London)"></textarea>\
        <button class="box--submit_button" onclick="weatherForecast()">Get the forecast</button>\
        <h3 class="box--subheader blue interactive_box--subheader">What\'s the weather forecast?</h3>'
    );
}

function weatherForecast() {
    var text = $("#weather").val();
    $("#weather_box").empty();
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather",
        data: {"APPID":"db87fcd07a11671d2eee5ce848db9459", "units":"metric", "q": text}
    }).then(function(data){
        var temp = data.main.temp;
        var weatherId = data.weather[0].id;
        var description = data.weather[0].description;

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
        $("#weather_box").append('<h3 class="box--subheader blue interactive_box--subheader">' + description + '</h3>');
        $("#weather_box").append('<h3 class="box--subheader dark_grey interactive_box--subheader">' + text + '</h3>');
        $("#weather_box").append('<h4 class="blue box--text interactive_box--text">Temperature: ' + temp + ' <sup>o</sup>C</h4>');
        $("#weather_box").append('<button class="box--submit_button" onclick="resetWeatherBox()">Get the forecast</button>')
        
    });
}

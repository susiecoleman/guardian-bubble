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

function getRecipe() {
    $.ajax({
        url: "/content",
        data: {"tag": "tone/recipes", "show-fields": "headline,thumbnail", "page-size": 1}
    }).then(function(data) {
        var headline = data.headline;
        var image = data.image;
        var url = data.url;
       $("#eat_headline").text(headline);
       $("#eat_link").attr("href", url);
       $("#eat_image").attr("src", image);
    });
}

function getBook() {
    $.ajax({
        url: "/content",
        data: {"tag": "books/series/book-of-the-day", "show-fields": "headline,thumbnail", "page-size": 1}
    }).then(function(data) {
        var headline = data.headline;
        var image = data.image;
        var url = data.url;
       $("#read_headline").text(headline);
       $("#read_link").attr("href", url);
       $("#read_image").attr("src", image);
    });
}

function getTv() {
    $.ajax({
        url: "/content",
        data: {"tag": "culture/series/watchthis", "show-fields": "headline,thumbnail", "page-size": 1}
    }).then(function(data) {
        var headline = data.headline;
        var image = data.image;
        var url = data.url;
       $("#watch_headline").text(headline);
       $("#watch_link").attr("href", url);
       $("#watch_image").attr("src", image);
    });
}

function getCartoon() {
    $.ajax({
        url: "/cartoon",
        data: {"tag": "commentisfree/series/guardian-comment-cartoon", "show-fields": "headline,main", "page-size": 1}
    }).then(function(data) {
        var headline = data.headline;
        var image = data.image;
        var url = data.url;
       $("#cartoon_headline").text(headline);
       $("#cartoon_link").attr("href", url);
       $("#cartoon_image").attr("src", image);
    });
}

function getReview() {
    $.ajax({
        url: "/content",
        data: {"tag": "tone/reviews", "show-fields": "headline,thumbnail", "page-size": 1}
    }).then(function(data) {
        var headline = data.headline;
        var image = data.image;
        var url = data.url;
       $("#do_headline").text(headline);
       $("#do_link").attr("href", url);
       $("#do_image").attr("src", image);
    });
}

function getPodcast() {
    $.ajax({
        url: "/content",
        data: {"tag": "type/audio,type/podcast", "show-fields": "headline,thumbnail", "page-size": 1}
    }).then(function(data) {
        var headline = data.headline;
        var image = data.image;
        var url = data.url;
       $("#podcast_headline").text(headline);
       $("#podcast_link").attr("href", url);
       $("#podcast_image").attr("src", image);
    });
}

function getPhotos() {
    $.ajax({
        url: "/gallery",
        data: {"tag": "news/series/ten-best-photographs-of-the-day", "show-elements" : "image", "page-size": 1, "show-fields": "headline,body"}
    }).then(function(data) {
        console.log(data);
        images = data.images;
        numOfImages = images.length;
        url = data.url;
        $("#gallery_link").attr("href", url);
        imageRotator();
        window.setInterval(imageRotator, 20000);
    });
}

function imageRotator() {
    var image = images[currentImage].src;
    var caption = images[currentImage].alt;
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
        '<textarea id="location" class="box--input_field" placeholder="Search by city... (but lets face it, it\'s probably London)"></textarea>\
        <button class="box--submit_button" type="submit" onclick="weatherForecast()">Get the forecast</button>\
        <h3 class="box--subheader blue interactive_box--subheader">What\'s the weather forecast?</h3>'
    );
}

function weatherForecast() {
    var location = $("#location").val();
    $("#weather_box").empty();
    $.ajax({
        url: "/weather",
        data: {"location": location}
    }).then(function(data){
        $("#weather_box").append(data);
    });
}

var indico = require('indico.io');
indico.apiKey =  process.env.INDICO_API_KEY;

function kathResponse(rant) {
    return indico.keywords(rant, {version: 2})
    .then(function(keywordsResponse){
        var word = Object.keys(keywordsResponse)[0];
        return indico.sentiment(rant)
            .then(function(emotionResponse){  
                var htmlResponse ='<h3 class="box--subheader blue interactive_box--subheader">Reassuring Kath Viner</h3>\
                <img class="box--image-full_width_image" src="Katherine-Viner.png" />\
                <p class="box--text interactive_box--text dark_grey">' + kathResponseSentence(rant, word, emotionResponse) + '</p>\
                <button class="box--submit_button box--submit_button-margin_bottom" onclick="resetKathBox()">But wait there\'s more</button>'
                return htmlResponse
            })
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

module.exports = kathResponse;
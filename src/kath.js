var indico = require('indico.io');
indico.apiKey =  process.env.INDICO_API_KEY;

function kathResponse(rant) {
    return indico.analyzeText(rant, {apis: ['sentiment_hq', 'people', 'places', 'organizations']})
        .then(function(json){
            var sentiment = json.sentiment_hq;
            var responseText = "";
            if(sentiment < 0.5) {
                responseText = generateNegativeReponse(json);
            } else responseText = generatePositiveResponse(json);
            return generateResponseHTML(responseText);
        })
}

function generateNegativeReponse(json) {
    var people = extractTextValues(json.people);
    if(people.length > 0) {
        return people[0] + " really seems to frustrate you. This is a completely valid view and you are totally in the right.";
    }
    var places = extractTextValues(json.places);
    if(places.length > 0) {
        return "I'm glad that you shared your feelings on " + places[0] + ". You should be proud of yourself.";
    }
    var organizations = extractTextValues(json.organizations);
    if(organizations.length > 0) {
        return "Please tell me more about your views on " + organizations[0] + " I find them fascinating."
    }
    return "This sounds like an issue that really frustrates you. Thank you for taking the time to tell me about it.";
}

function generatePositiveResponse(json) {
    var people = extractTextValues(json.people);
    if(people.length > 0) {
        return people[0] + " is great you're completely right.";
    }
    var places = extractTextValues(json.places);
    if(places.length > 0) {
        return "It's fantastic you're passionate about " + places[0] + ". How about an opinion piece on it for The Guardian?";
    }
    var organizations = extractTextValues(json.organizations);
    if(organizations.length > 0) {
        return "You're right to be so happy about " + organizations[0] + " please tell me more."
    }
    return "It's really great to hear about the things you love. If they're important to you they are important to me.";
}

function extractTextValues(apiResponse) {
    var value = [];
    apiResponse.forEach(element => {
        value.push(element.text);
    });
    return value;
}

function generateResponseHTML(text) {
    return '<h3 class="box--subheader blue interactive_box--subheader">Reassuring Kath Viner</h3>\
    <img class="box--image-full_width_image" src="Katherine-Viner.png" />\
    <p class="box--text interactive_box--text dark_grey">' + text + '</p>\
    <button class="box--submit_button box--submit_button-margin_bottom" onclick="resetKathBox()">But wait there\'s more</button>'
}

module.exports = kathResponse;

var fetch = require("node-fetch");
cheerio = require('cheerio')

function getGuardianContent(parameters) {
    var url = buildUrl(parameters)
    return fetch(url, {"URLSearchParams": parameters})
        .then(function(response){
            return response.json()
        }).then(function(json){
            var content = {};
            content["headline"] = json.response.results[0].fields.headline;
            content["image"] = json.response.results[0].fields.thumbnail;
            content["url"] = json.response.results[0].webUrl;
            return content;
        });
}

function getGuardianGallery(parameters) {
    var url = buildUrl(parameters)
    return fetch(url, {"URLSearchParams": parameters})
        .then(function(response){
            return response.json()
        }).then(function(json){
            var content = {};
            content["images"] = getGalleryImages(json.response.results[0].fields.body);
            content["url"] = json.response.results[0].webUrl;
            return content;
        });
}

function getGuardianCartoon(parameters) {
    var url = buildUrl(parameters)
    return fetch(url, {"URLSearchParams": parameters})
        .then(function(response){
            return response.json()
        }).then(function(json){
            var content = {}
            content["headline"] = json.response.results[0].fields.headline;
            content["image"] = getCartoonImage(json.response.results[0].fields.main);
            content["url"] = json.response.results[0].webUrl;
            getCartoonImage(json.response.results[0].fields.main);
            return content;
        });
}

function getCartoonImage(cartoonHtml) {
    var $ = cheerio.load(cartoonHtml);
    return $('img').attr('src');
}

function getGalleryImages(html) {
    var images = [];
    var $ = cheerio.load(html);
    $('img').each(function(i, elem) {
        var image = {}
        image["src"] = elem.attribs.src;
        image["alt"] = elem.attribs.alt;
        images.push(image);
    });
    return images;
}

function buildUrl(parameters) {
    var url = "https://content.guardianapis.com/search?api-key="+process.env.GUARDIAN_API_KEY;
    for (var key in parameters){
        var attrName = key;
        var attrValue = parameters[key];
        url = url + "&" + attrName + "=" + attrValue
    }
    return url;
}

module.exports = {
    getGuardianContent,
    getGuardianCartoon,
    getGuardianGallery
}

const twitterClient = require("../config/twitter-connection");

async function getTweets(parameterObject) {
    return new Promise(function (resolve, reject) {
        twitterClient.get(
            "statuses/user_timeline",
            parameterObject,
            function (error, tweets, response) {
                if (!error) {
                    return resolve(JSON.parse(response.body));
                } else {
                    console.log(error);
                }
            }
        );
    });
}

function wrapURL(text) {
    // Create your regex pattern for urls
    let urlPattern =
        /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\z`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
    let urlWrapped = text.replace(urlPattern, function (url) {
        return `<a href="${url.trim()}" target="_blank">${url.trim()}</a>`;
    });
    let hashTagWrapped = urlWrapped.replace(
        /(^|\W)(#[a-z\d][\w-]*)/gi,
        `$1<a href="https://twitter.com/hashtag/$2?src=hashtag_click" target="_blank">$2</a>`
    );
    console.log(hashTagWrapped);
    console.log(hashTagWrapped.indexOf("ag/#"));
    var indexToRemove = hashTagWrapped.indexOf("ag/#");
    if (indexToRemove !== -1) {
        hashTagWrapped =
            hashTagWrapped.slice(0, indexToRemove + 3) +
            hashTagWrapped.slice(indexToRemove + 4);
    }

    return hashTagWrapped;
}

module.exports = { getTweets, wrapURL };

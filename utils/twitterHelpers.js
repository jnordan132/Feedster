const twitterClient = require("../config/twitter-connection");

//get tweet feed data
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

//wrap hashtags and urls, used for tweet text in feeds
function wrapURL(text) {
    let urlPattern =
        /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\z`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
    let urlWrapped = text.replace(urlPattern, function (url) {
        return `<a href="${url.trim()}" target="_blank">${url.trim()}</a>`;
    });
    let hashTagWrapped = urlWrapped.replace(
        /(^|\W)(#[a-z\d][\w-]*)/gi,
        `$1<a href="https://twitter.com/hashtag/$2?src=hashtag_click" target="_blank">$2</a>`
    );
    var indexToRemove = hashTagWrapped.indexOf("ag/#");
    if (indexToRemove !== -1) {
        hashTagWrapped =
            hashTagWrapped.slice(0, indexToRemove + 3) +
            hashTagWrapped.slice(indexToRemove + 4);
    }
    let atSignWrapped = hashTagWrapped.replace(
        /(^|\W)(@[a-z\d][\w-]*)/gi,
        `$1<a href="https://twitter.com/$2" target="_blank">$2</a>`
    );
    return atSignWrapped;
}

//https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
function sortTweetArray(arr) {
    arr.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
    });
}

module.exports = { getTweets, wrapURL, sortTweetArray };

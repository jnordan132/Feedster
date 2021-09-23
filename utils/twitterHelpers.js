const twitterClient = require("../config/twitter-connection");

async function getTweets(parameterObject) {
    console.log("getTweets");
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
    console.log("wrapURL");
    // Create your regex pattern for urls
    let urlPattern =
        /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\z`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
    let result = text.replace(urlPattern, function (url) {
        return `<a href="${url.trim()}">${url.trim()}</a>`;
    });

    return result.replace(
        /(^|\W)(#[a-z\d][\w-]*)/gi,
        `$1<a href="/test/">$2</a>`
    );
}

module.exports = { getTweets, wrapURL };

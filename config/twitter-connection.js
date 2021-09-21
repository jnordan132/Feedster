var Twitter = require("twitter");
require("dotenv").config();

var twitterClient = new Twitter({
    consumer_key: process.env.TW_CONSUMER_KEY,
    consumer_secret: process.env.TW_CONSUMER_SECRET,
    access_token_key: process.env.TW_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET,
    bearer_token: process.env.TW_BEARER_TOKEN,
});

var params = { screen_name: "nodejs" };

async function twitterConnection(paramsObject) {
    twitterClient.get(
        "statuses/user_timeline",
        paramsObject,
        async function (error, tweets, response) {
            if (!error) {
                const test = await response;
                myTest(test);
            }
        }
    );
}

function myTest(test) {
    var testr = JSON.parse(test.body);
    console.log(testr[0]);
}

twitterConnection(params);

module.exports = twitterClient;

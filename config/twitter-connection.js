var Twitter = require("twitter");
require("dotenv").config();

var twitterClient = new Twitter({
    consumer_key: process.env.TW_CONSUMER_KEY,
    consumer_secret: process.env.TW_CONSUMER_SECRET,
    access_token_key: process.env.TW_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET,
    bearer_token: process.env.TW_BEARER_TOKEN,
});

module.exports = twitterClient;

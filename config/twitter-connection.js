// importing twitter npm dependency: https://www.npmjs.com/package/twitter
var Twitter = require("twitter");
require("dotenv").config();

// for user based authentication - field definitions specified here - https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api
var twitterClient = new Twitter({
    consumer_key: process.env.TW_CONSUMER_KEY,
    consumer_secret: process.env.TW_CONSUMER_SECRET,
    access_token_key: process.env.TW_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET,
    bearer_token: process.env.TW_BEARER_TOKEN,
});

module.exports = twitterClient;

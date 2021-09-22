const router = require("express").Router();
const { Users, Feeds, FeedSources } = require("../models");
const twitterClient = require("../config/twitter-connection");

router.get("/", async (req, res) => {
    // router.get("/", async (req, res,next) => { //--> could use this line if instead of doing explicit catches on line 29 of this file we opt for line 30 instead as defined in error handler
    try {
        const feedsData = await Feeds.findAll({
            include: [
                {
                    model: Users,
                    attributes: { exclude: ["password"] },
                },
                {
                    model: FeedSources,
                },
            ],
        });
        const feedsDataCleaned = feedsData.map((record) =>
            record.get({ plain: true })
        );

        var tweetArray = [];
        var tweetCount = 2;
        for (let x = 0; x < feedsDataCleaned.length; x++) {
            const element = feedsDataCleaned[x];
            for (let y = 0; y < element.feed_sources.length; y++) {
                const ele = element.feed_sources[y];
                var params = {
                    screen_name: ele.source,
                    count: tweetCount,
                };
                var twitterFeed = await getTweets(params);
                for (let q = 0; q < twitterFeed.length; q++) {
                    const el = twitterFeed[q];
                    // el.text = wrapWithHtml(el.text);
                    tweetArray.push(el);
                }
            }
            element.tweetFeed = tweetArray;
            tweetArray = [];
        }

        console.log(feedsDataCleaned);
        res.render("homepage", {
            UserAndFeedData: feedsDataCleaned,
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
        });
    } catch (err) {
        res.status(500).json(err);
        // or could call next(err) since the error handler is now set up in server.js
    }
});

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

module.exports = router;

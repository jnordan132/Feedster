const router = require("express").Router();
const { Users, Feeds, FeedFollowers, FeedSources } = require("../models");
const Sequelize = require("sequelize");
const twitterHelpers = require("../utils/twitterHelpers");

// router.get("/:id", async (req, res) => {
//--> using this line instead of doing explicit catches on line 82 of this file so as to opt for line 83 instead as defined in error handler in server js file
router.get("/:id", async (req, res) => {
    try {
        const userData = await Users.findOne({
            where: {
                id: req.params.id,
            },
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Feeds,
                    include: [
                        {
                            model: FeedSources,
                        },
                        {
                            model: Users,
                        },
                    ],
                },
            ],
        });
        // if(!userData) {
        //     throw new AppError("Record not found!", 404);
        // }

        const userDataCleaned = userData.get({ plain: true });
        const feedFollowersCountData = await FeedFollowers.count({
            where: {
                user_created_id: req.params.id,
            },
        });

        const feedFollowedCountData = await FeedFollowers.count({
            where: {
                user_following_id: req.params.id,
            },
        });

        const feedCreatedCountData = await Feeds.count({
            where: {
                user_id: req.params.id,
            },
        });

        const followedFeedData = await FeedFollowers.findAll({
            where: {
                user_following_id: req.params.id,
                user_created_id: {
                    [Sequelize.Op.not]: req.params.id,
                },
            },
            include: [
                {
                    model: Feeds,
                    include: [
                        {
                            model: FeedSources,
                        },
                        {
                            model: Users,
                        },
                    ],
                },
            ],
        });

        const followedFeedDataCleaned = followedFeedData.map((record) =>
            record.get({ plain: true })
        );
        // get and add tweets for both created and followed feeds
        var tweetArray = [];
        var tweetCount = 2;
        for (let i = 0; i < userDataCleaned.feeds.length; i++) {
            const element = userDataCleaned.feeds[i];
            for (let j = 0; j < element.feed_sources.length; j++) {
                const ele = element.feed_sources[j];
                var params = { screen_name: ele.source, count: tweetCount };
                var twitterFeed = await twitterHelpers.getTweets(params);
                for (let k = 0; k < twitterFeed.length; k++) {
                    const el = twitterFeed[k];
                    el.text = twitterHelpers.wrapURL(el.text);
                    tweetArray.push(el);
                }
            }
            twitterHelpers.sortTweetArray(tweetArray);
            element.tweetFeed = tweetArray;
            tweetArray = [];
        }
        //followed feeds
        var tweetArray2 = [];
        for (let x = 0; x < followedFeedDataCleaned.length; x++) {
            const element = followedFeedDataCleaned[x].feed;
            for (let y = 0; y < element.feed_sources.length; y++) {
                const ele = element.feed_sources[y];
                var params2 = {
                    screen_name: ele.source,
                    count: tweetCount,
                };
                var twitterFeed2 = await twitterHelpers.getTweets(params2);
                for (let q = 0; q < twitterFeed2.length; q++) {
                    const el = twitterFeed2[q];
                    el.text = twitterHelpers.wrapURL(el.text);
                    tweetArray2.push(el);
                }
            }
            //sort by date
            twitterHelpers.sortTweetArray(tweetArray2);
            element.tweetFeed = tweetArray2;
            tweetArray2 = [];
        }
        res.render("profile", {
            UserAndFeedData: userDataCleaned,
            profileFollowersCount: feedFollowersCountData,
            profileFollowedCount: feedFollowedCountData,
            profileCreatedCount: feedCreatedCountData,
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
            profileFollowedFeeds: followedFeedDataCleaned,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

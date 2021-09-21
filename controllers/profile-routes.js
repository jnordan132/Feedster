const router = require("express").Router();
const { Users, Feeds, FeedFollowers, FeedSources } = require("../models");
const Sequelize = require("sequelize");
// const AppError = require("./utils/appError");
const twitterClient = require("../config/twitter-connection");

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

        // twitterConnection1(params);

        //NEED to add tweet data to each feed_source object TODO
        //get to each feed source that was created by profile
        userDataCleaned.feeds.forEach((element) => {
            let feedToModify = element;
            console.log(feedToModify);
        });
        //get to each feed source that was followed by user who's profile it is
        followedFeedDataCleaned.forEach((element) => {
            let feedToModify = element.feed;
            console.log(feedToModify);
        });

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
        // res.status(500).json(err);
        // next(err);
        // or could call next(err) since the error handler is now set up in server.js
    }
});

var params = { screen_name: "nodejs" };

async function getTwitterFeed(paramsObject) {
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

module.exports = router;

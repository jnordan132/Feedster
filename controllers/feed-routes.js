const router = require("express").Router();
const { Feeds, Users, FeedSources, Comments } = require("../models");

router.get("/:id", async (req, res) => {
    const feedData = await Feeds.findOne({
        where: {
            id: req.params.id,
        },
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
    const feed = feedData.get({ plain: true });
    const commentData = await Comments.findAll({
        where: {
            feed_id: req.params.id,
        },
        include: [
            {
                model: Users,
                attributes: { exclude: ["password"] },
            },
        ],
    });
    const comments = commentData.map((post) => post.get({ plain: true }));
    res.render("feed", {
        loggedIn: req.session.loggedIn,
        loggedInUserData: req.session.loggedInUserData,
        currentFeed: feed,
        feedComments: comments,
    });
});

module.exports = router;

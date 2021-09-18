const router = require("express").Router();
const { Users, Feeds, FeedSources } = require("../models");

router.get("/", async (req, res) => {
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
        console.log(feedsDataCleaned);
        res.render("homepage", {
            UserAndFeedData: feedsDataCleaned,
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

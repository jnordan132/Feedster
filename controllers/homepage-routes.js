const router = require("express").Router();
const { Users, Feeds, FeedSources } = require("../models");

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
        console.log(req.session.loggedIn);
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

module.exports = router;

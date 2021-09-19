const router = require("express").Router();
const { Feeds, Users, FeedFollowers } = require("../../models");

//create feed follow: http://localhost:3001/api/feedfollowers/
/*
{
   "feed_id":"1",
   "user_following_id":"2",
   "user_created_id":"1"
}
*/
router.post("/", async (req, res) => {
    try {
        const feedFollowersData = await FeedFollowers.findOrCreate({
            where: {
                feed_id: req.body.feed_id,
                user_following_id: req.body.user_following_id,
                user_created_id: req.body.user_created_id,
            },
            defaults: {
                feed_id: req.body.feed_id,
                user_following_id: req.body.user_following_id,
                user_created_id: req.body.user_created_id,
            },
        });
        return res.status(200).json(feedFollowersData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//get feed followers for a feed: http://localhost:3001/api/feedfollowers/1
router.get("/:id", async (req, res) => {
    try {
        const feedFollowersData = await FeedFollowers.findAll({
            where: {
                feed_id: req.params.id,
            },
            include: [
                {
                    model: Users,
                    attributes: { exclude: ["password"] },
                },
                {
                    model: Feeds,
                    attributes: { exclude: ["feed_id"] },
                },
            ],
        });
        const feedFollowers = feedFollowersData.map((post) =>
            post.get({ plain: true })
        );

        if (feedFollowers) {
            console.log(feedFollowers);
            return res.status(200).json(feedFollowers);
        } else {
            res.status(404).json({ message: "Followers for feed not found." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//No updated needed I can think of..

// delete feed follow: http://localhost:3001/api/feedfollowers/1
router.delete("/:id", async (req, res) => {
    try {
        const deleteResponse = await FeedFollowers.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(deleteResponse);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;

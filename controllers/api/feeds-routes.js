const router = require("express").Router();
const { Feeds, FeedSources, Users, Comments } = require("../../models");

//create feed: http://localhost:3001/api/feeds/
/*
{
   "title":"Node.js Programming",
   "user_id":"1",
   "sources":[
      {
         "source":"@nodejs"
      },
      {
         "source":"@trott"
      },
      {
         "source":"@adamzdanielle"
      }
   ]
}
*/
router.post("/", async (req, res) => {
    try {
        const feedsData = await Feeds.create({
            title: req.body.title,
            user_id: req.body.user_id,
        });
        const feed = feedsData.get({ plain: true });
        const newFeedId = feed.id;
        const sources = req.body.sources;
        sources.forEach(async (element) => {
            await FeedSources.create({
                feed_id: newFeedId,
                source: element.source,
            });
        });
        return res.status(200).json(feedsData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//get a feed: http://localhost:3001/api/feeds/10
router.get("/:id", async (req, res) => {
    try {
        const feedData = await Feeds.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: FeedSources,
                    attributes: { exclude: ["feed_id"] },
                },
            ],
        });
        const feed = feedData.get({ plain: true });
        if (feed) {
            console.log(feed);
            return res.status(200).json(feed);
        } else {
            res.status(404).json({ message: "Feed not found." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//get comments for a feed: http://localhost:3001/api/feeds/comments/1
router.get("/comments/:id", async (req, res) => {
    try {
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
        if (comments) {
            return res.status(200).json(comments);
        } else {
            res.status(404).json({ message: "Feed not found." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//update a feed: http://localhost:3001/api/feeds/10
/*
{
   "title":"Updated Title",
   "user_id":"1",
   "sources":[
      {
         "id": 1,
         "source":"@test"
      },
      {
         "id": 2,
         "source":"@test2"
      },
      {
        "id": 3,
         "source":"@test3"
      }
   ]
} 
*/
router.put("/:id", async (req, res) => {
    try {
        const updateFeedResult = await Feeds.update(
            {
                title: req.body.title,
                user_id: req.body.user_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        const updatedSources = req.body.sources;
        //need to get each ID so we know which fields to update
        updatedSources.forEach(async (element) => {
            await FeedSources.update(
                {
                    source: element.source,
                },
                {
                    where: {
                        id: element.id,
                    },
                }
            );
        });
        return res.status(200).json(updateFeedResult);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// delete feed: http://localhost:3001/api/feeds/
router.delete("/:id", async (req, res) => {
    try {
        await FeedSources.destroy({
            where: {
                feed_id: req.params.id,
            },
        });
        const deleteFeedData = await Feeds.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(deleteFeedData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;

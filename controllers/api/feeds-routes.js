const router = require("express").Router();
const { Feeds, FeedSources } = require("../../models");

// router.get("/", async (req, res) => {
//     console.log("get test from api (node)");
//     return res.status(200).json("test!");
// });

//create feed
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

// // delete comment
// router.delete("/:id", async (req, res) => {
//     try {
//         const deleteCommentData = await Test.destroy({
//             where: {
//                 id: req.body.id,
//             },
//         });
//         return res.status(200).json(deleteCommentData);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//     }
// });

module.exports = router;

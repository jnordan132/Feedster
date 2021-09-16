const router = require("express").Router();
const { Feeds, Comments, Users } = require("../../models");

//create feed: http://localhost:3001/api/feeds/
/*
{
   "comment":"This is a cool feed.",
   "user_id":"1",
   "feed_id":"1"
}
*/
router.post("/", async (req, res) => {
    try {
        const commentData = await Comments.create({
            comment: req.body.comment,
            user_id: req.body.user_id,
            feed_id: req.body.feed_id,
        });
        const comment = commentData.get({ plain: true });
        return res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//get a comment by id: http://localhost:3001/api/comments/1
router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comments.findAll({
            where: {
                id: req.params.id,
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

// delete a comment: http://localhost:3001/api/comments/1
router.delete("/:id", async (req, res) => {
    try {
        const commentResult = await Comments.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(commentResult);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;

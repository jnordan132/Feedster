const router = require("express").Router();
const { Test } = require("../../models");

router.get("/", async(req, res) => {
    console.log("get test from api (node)");
    return res.status(200).json("test!");
});

//create comment
router.post("/", async(req, res) => {
    try {
        const testData = await Test.create({
            test: req.body.test,
        });
        return res.status(200).json(testData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// delete comment
router.delete("/:id", async(req, res) => {
    try {
        const deleteCommentData = await Test.destroy({
            where: {
                test: req.body.test,
            }
        });
        return res.status(200).json(deleteCommentData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
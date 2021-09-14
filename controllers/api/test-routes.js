const router = require("express").Router();
const { Test } = require("../../models");

router.get("/", async (req, res) => {
    console.log("get test from api (node)");
    return res.status(200).json("test!");
});

module.exports = router;

const router = require("express").Router();
const { Test } = require("../models");

router.get("/", async (req, res) => {
    console.log("get test (node)");
    res.render("test");
});

module.exports = router;

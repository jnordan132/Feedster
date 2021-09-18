const router = require("express").Router();
const { Feeds } = require("../models");

router.get("/:id", async (req, res) => {
    res.render("feed", {
        loggedIn: req.session.loggedIn,
        loggedInUserData: req.session.loggedInUserData,
    });
});

module.exports = router;

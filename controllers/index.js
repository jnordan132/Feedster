const router = require("express").Router();

const apiRoutes = require("./api");
const profileRoutes = require("./profile-routes");
const homepageRoutes = require("./homepage-routes");
const feedRoutes = require("./feed-routes");


//use each of the routes files in the controllers folder
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);
router.use("/", homepageRoutes);
router.use("/feed", feedRoutes);


router.get("/signup", async (req, res) => {
    res.render("signup", {
        loggedIn: req.session.loggedIn,
        loggedInUserData: req.session.loggedInUserData,
    });
});

router.get("/login", async (req, res) => {
    res.render("login", {
        loggedIn: req.session.loggedIn,
        loggedInUserData: req.session.loggedInUserData,
    });
});

router.get("/logout", async (req, res) => {
    res.render("logout", {
        loggedIn: false,
        loggedInUserData: null,
    });
});

module.exports = router;

const router = require("express").Router();

const apiRoutes = require("./api");
const testRoutes = require("./test-routes");
const profileRoutes = require("./profile-routes");

//use each of the routes files in the controllers folder
router.use("/test", testRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);

router.get("/", async (req, res) => {
    res.render("index", {
        loggedIn: req.session.loggedIn,
        loggedInUserData: req.session.loggedInUserData,
    });
});

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

router.get("/profile", async (req, res) => {
    res.render("profile", {
        loggedIn: req.session.loggedIn,
        loggedInUserData: req.session.loggedInUserData,
    });
});

module.exports = router;

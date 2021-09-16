const router = require("express").Router();

const testRoutes = require("./test-routes");
const apiRoutes = require("./api");

//use each of the routes files in the controllers folder
router.use("/test", testRoutes);
router.use("/api", apiRoutes);

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

module.exports = router;

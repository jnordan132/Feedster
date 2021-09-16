const router = require("express").Router();

const testRoutes = require("./test-routes");
const apiRoutes = require("./api");

//use each of the routes files in the controllers folder
router.use("/test", testRoutes);
router.use("/api", apiRoutes);

router.get("/signup", async (req, res) => {
    res.render("signup", {
        loggedIn: req.session.loggedIn,
        loggedInUserData: req.session.loggedInUserData,
    });
});

module.exports = router;

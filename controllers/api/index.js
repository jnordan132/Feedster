const router = require("express").Router();

const testRoutes = require("./test-routes.js");
const usersRoutes = require("./users-routes.js");
const feedsRoutes = require("./feeds-routes.js");
const feedFollowersRoutes = require("./feed-followers-routes.js");

//pass each API route to router
router.use("/test", testRoutes);
router.use("/users", usersRoutes);
router.use("/feeds", feedsRoutes);
router.use("/feedfollowers", feedFollowersRoutes);

module.exports = router;

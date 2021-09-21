const router = require("express").Router();

const usersRoutes = require("./users-routes.js");
const feedsRoutes = require("./feeds-routes.js");
const feedFollowersRoutes = require("./feed-followers-routes.js");
const commentsRoutes = require("./comments-routes.js");

//pass each API route to router
router.use("/users", usersRoutes);
router.use("/feeds", feedsRoutes);
router.use("/feedfollowers", feedFollowersRoutes);
router.use("/comments", commentsRoutes);


module.exports = router;

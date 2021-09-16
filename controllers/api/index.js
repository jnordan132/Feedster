const router = require("express").Router();

const testRoutes = require("./test-routes.js");
const usersRoutes = require("./users-routes.js");
const feedsRoutes = require("./feeds-routes.js");

//pass each API route to router
router.use("/test", testRoutes);
router.use("/users", usersRoutes);
router.use("/feeds", feedsRoutes);

module.exports = router;

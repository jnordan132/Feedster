const router = require("express").Router();

const testRoutes = require("./test-routes.js");
const userRoutes = require("./users-routes.js");

//pass each API route to router
router.use("/test", testRoutes);
router.use("/users", userRoutes);

module.exports = router;

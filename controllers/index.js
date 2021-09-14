const router = require("express").Router();

const testRoutes = require("./test-routes");
const apiRoutes = require("./api");

//use each of the routes files in the controllers folder
router.use("/test", testRoutes);
router.use("/api", apiRoutes);

module.exports = router;

const router = require("express").Router();
// //api requires can also be done separately
const apiRoutes = require("./api");
const testRoutes = require("./test-routes");

//use each of the routes files in the controllers folder
router.use("/test", testRoutes);
// router.use("/api", apiRoutes);

module.exports = router;

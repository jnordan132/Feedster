const router = require("express").Router();

const userRoutes = require("./test-routes.js");

//pass each API route to router
router.use("/test", userRoutes);

module.exports = router;

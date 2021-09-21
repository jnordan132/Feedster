const router = require("express").Router();

router.get('/tos', async (req, res) => {
    // Send the rendered terms of service Handlebars.js template back as the response
    res.render('tos');
  });
  
  module.exports = router;
  
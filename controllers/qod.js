const Quote = require("../models/Quote");

// @desc   Get the day quote
// @route  GET /
// @access Public
exports.getQOD = (req, res) => {
  res.send("Quote of the day will be sent from this route");
};

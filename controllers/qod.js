const Quote = require("../models/Quote");

// @desc   Get the day quote
// @route  GET /
// @access Public
exports.getQOD = async (req, res) => {
  const quote = await Quote.find({});
  res.status(200).json(quote);
};

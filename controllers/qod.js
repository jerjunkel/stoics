const Quote = require("../models/Quote");
const store = require("../store/qod");
require("../models/Author");

// @desc   Get the day quote
// @route  GET /
// @access Public
exports.getQOD = async (req, res) => {
  const qod = store.getters.getState().qod;
  res.status(200).json(qod);
};

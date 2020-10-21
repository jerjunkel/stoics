const Quote = require("../models/Quote");
const Author = require("../models/Author");

// @desc   Get the day quote
// @route  GET /
// @access Public
exports.getQOD = async (req, res) => {
  try {
    const quote = await Quote.findOne({}, "-_id").populate({
      path: "author",
      select: "name -_id",
    });

    res.status(200).json(quote);
  } catch (err) {
    console.log(err);
  }
};

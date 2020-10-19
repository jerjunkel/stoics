const Quote = require("../models/Quote");
const Author = require("../models/Author");

// @desc   Get the day quote
// @route  GET /
// @access Public
exports.getQOD = async (req, res) => {
  try {
    const { quote, day, author } = await Quote.findOne({}, "-_id");
    const { name } = await Author.findById(author);

    res.status(200).json({ quote, day, name });
  } catch (err) {
    console.log(err);
  }
};

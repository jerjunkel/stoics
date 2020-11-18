const { getRandomQuote } = require("../utilities/quotes");

// @desc   Get a random quote
// @route  GET /
// @access Public
exports.getRandomQuote = async (req, res) => {
  try {
    const quote = await getRandomQuote();
    res.status(200).json(quote);
  } catch (err) {
    console.log(err);
  }
};

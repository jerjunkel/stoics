const Quote = require("../models/Quote");
const getRandomQuote = async () => {
  const quotes = await Quote.aggregate([{ $sample: { size: 1 } }]);
  if (quotes.length == 0) {
    return {};
  } else {
    // console.log(quotes[0]);
    return quotes[0];
  }
};

module.exports = getRandomQuote;

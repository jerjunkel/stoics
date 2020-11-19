const Quote = require("../models/Quote");
const day = dayOfTheYear(new Date());
const store = require("../store/qod");
const utility = require("./quotes");

async function setQuoteOfDay() {
  try {
    // Check for QOD
    let quote = await Quote.findOne({ day });

    if (quote) {
      const qodResource = await quote.populateWithAuthorName();
      store.actions.update(qodResource);
      return;
    }

    // Get a random quote
    const randomQuote = await utility.getRandomQuote([
      { $match: { flag: false } },
      { $sample: { size: 1 } },
    ]);

    if (!randomQuote) throw Error("No quotes found in database");

    quote = await Quote.findByIdAndUpdate(randomQuote._id, { day, flag: true });
    const qodResource = await quote.populateWithAuthorName();
    store.actions.update(qodResource);
  } catch (err) {
    console.log(err);
  }
}

function dayOfTheYear(date) {
  return Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
}

module.exports = setQuoteOfDay;

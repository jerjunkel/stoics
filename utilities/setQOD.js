const Quote = require("../models/Quote");
const day = dayOfTheYear(new Date());
const store = require("../store/qod");

async function setQuoteOfDay() {
  try {
    // Check for QOD
    let quote = await Quote.findOne({ day });

    if (quote) {
      store.actions.update(quote);
      return;
    }

    // Get a random QOD
    const quotes = await Quote.aggregate([
      { $match: { flag: false } },
      { $sample: { size: 1 } },
    ]);

    if (quotes.length == 0) throw Error("No quotes found in database");
    quote = quotes[0];
    quote.day = day;

    await Quote.findByIdAndUpdate(quote._id, { day, flag: true });
    store.actions.update(quote);
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

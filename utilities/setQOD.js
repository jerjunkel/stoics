const { text } = require("express");
const Quote = require("../models/Quote");
const day = dayOfTheYear(new Date());
const store = require("../store/qod");

async function setQuoteOfDay() {
  try {
    // Check for QOD
    let quote = await Quote.findOne({ day });

    if (quote) {
      const QODResource = await populateQODResource(quote);
      store.actions.update(QODResource);
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
    const QODResource = await populateQODResource(quote);
    store.actions.update(QODResource);
  } catch (err) {
    console.log(err);
  }
}

function dayOfTheYear(date) {
  return Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
}

async function populateQODResource(quote) {
  try {
    const formatedQOD = await Quote.findById(quote._id, "-_id").populate({
      path: "author",
      select: "-_id",
    });
    return formatedQOD;
  } catch (err) {
    console.log(err);
  }
}

module.exports = setQuoteOfDay;

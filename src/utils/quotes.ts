import Quote from "../models/Quote.js";
const getRandomQuote = async (predicate = [{ $sample: { size: 1 } }]) => {
  const quotes = await Quote.aggregate(predicate);
  if (quotes.length == 0) {
    return null;
  } else {
    return quotes[0];
  }
};

export { getRandomQuote };

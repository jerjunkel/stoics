import Quote from "../models/Quote.js";
const getRandomQuote = async (predicate = [{ $sample: { size: 1 } }]) => {
  const quotes = await Quote.aggregate(predicate);
  return quotes.length == 0 ? null : quotes[0];
};

export { getRandomQuote };

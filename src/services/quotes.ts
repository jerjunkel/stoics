import Quote from "../models/Quote.js";
import IQuote from "../interfaces/Quote.js";

const getQuotes = async (filter: {} = {}) => {
  const quotes = await Quote.find(filter).lean().populate("stoic", "name");
  return quotes;
};

const getQuoteByID = async (id: string) => {
  const quote = await Quote.findById(id).lean().exec();
  return quote;
};

export default { getQuotes, getQuoteByID };

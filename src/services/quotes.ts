import QuoteRespository from "../repositories/quotes.repository.js";

const findAllQuotes = async (filter: {} = {}) => {
  const quotes = await QuoteRespository.readAll(filter);
  return quotes;
};

const findQuoteById = async (id: string) => {
  const quote = await QuoteRespository.readOne(id);
  return quote;
};

export { findQuoteById, findAllQuotes };

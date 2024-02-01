import { IService, IQuote } from "../interfaces/index.js";
import QuoteRespository from "../repositories/quotes.repository.js";

const repo = new QuoteRespository();

const findAllQuotes = async (filter: {} = {}) => {
  const quotes = await repo.find(filter);
  return quotes;
};

const findQuoteById = async (id: string) => {
  const quote = await repo.get(id);
  return quote;
};

export { findQuoteById, findAllQuotes };

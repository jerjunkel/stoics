import { Response, Request } from "express";
import QuoteService from "../services/quotes.service.js";
import QuoteRespository from "../repositories/quotes.repository.js";

const service = new QuoteService(new QuoteRespository());

const getAllQuotes = async (req: Request, res: Response) => {
  const quotes = await service.getAllQuotes();
  return res.json(quotes);
};

const getAQuote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const quote = await service.getAQuoteByID(id);
  if (quote == null) return res.status(404).json({});
  return res.status(200).json(quote);
};

const getTodayQuote = async (req: Request, res: Response) => {
  const quote = await service.getTodaysQuote();
  return res.send(quote);
};

const getARandomQuote = async (req: Request, res: Response) => {
  const quote = await service.getARandomQuote();
  res.send(quote);
};

export default {
  service,
  getAllQuotes,
  getAQuote,
  getTodayQuote,
  getARandomQuote,
};

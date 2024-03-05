import { Response, Request } from "express";
import QuoteService from "../services/quotes.service.js";
import QuoteRespository from "../repositories/quotes.repository.js";
import { addResourceType } from "../utils/api.js";
import IQuote from "../interfaces/Quote.js";

const service = new QuoteService(new QuoteRespository());

const getAllQuotes = async (req: Request, res: Response) => {
  const quotes = await service.getAllQuotes();
  return res.json(quotes);
};

const findQuoteByID = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const quote = await service.getAQuoteByID(id);
    res
      .status(quote ? 200 : 404)
      .json({ data: quote ? addResourceType<IQuote>("quotes", quote) : null });
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .json({ errors: [{ title: "client_error", detail: err.message }] });
    }
  }
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
  findQuoteByID,
  getTodayQuote,
  getARandomQuote,
};

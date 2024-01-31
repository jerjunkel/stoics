import { Response, Request } from "express";
import { getRandomQuote, getDailyQuote } from "../utils/quotes.js";
import { getQuoteByID, getQuotes } from "../services/quotes.js";

const getAllQuotes = async (req: Request, res: Response) => {
  const quotes = await getQuotes();
  return res.json(quotes);
};

const getAQuote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const quote = await getQuoteByID(id);
  if (quote == null) return res.status(404).json({});
  return res.status(200).json(quote);
};

const getTodayQuote = async (req: Request, res: Response) => {
  const quote = await getDailyQuote();
  return res.send(quote);
};

const getARandomQuote = async (req: Request, res: Response) => {
  const quote = await getRandomQuote();
  res.send(quote);
};

function dayOfTheYear(date: Date) {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
}

export default { getAllQuotes, getAQuote, getTodayQuote, getARandomQuote };

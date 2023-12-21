import { Response, Request } from "express";
import Quote from "../models/Quote.js";
import { getRandomQuote, getDailyQuote } from "../utils/quotes.js";

const getAllQuotes = async (req: Request, res: Response) => {
  const quotes = await Quote.find({});
  return res.send(quotes);
};

const getAQuote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const quote = await Quote.findById(id);
  return res.send(quote);
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

export { getAllQuotes, getAQuote, getTodayQuote, getARandomQuote };

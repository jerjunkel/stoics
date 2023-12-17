import Express from "express";
import Quote from "../models/Quote.js";
import { getRandomQuote } from "../utils/quotes.js";

const getAllQuotes = async (req: Express.Request, res: Express.Response) => {
  const quotes = await Quote.find({});
  return res.send(quotes);
};

const getAQuote = async (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  const quote = await Quote.findById(id);
  return res.send(quote);
};

const getTodayQuote = async (req: Express.Request, res: Express.Response) => {
  const day = dayOfTheYear(new Date());
  const quote = await Quote.find({ day });

  return res.send(quote);
};

const getARandomQuote = async (req: Express.Request, res: Express.Response) => {
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

import Express from "express";
import Quote from "../models/Quote.js";

const getAllQuotes = async (req: Express.Request, res: Express.Response) => {
  const quotes = await Quote.find({});
  return res.send(quotes);
};

const getAQuote = async (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  const quote = await Quote.findById(id);
  return res.send(quote);
};

export { getAllQuotes, getAQuote };

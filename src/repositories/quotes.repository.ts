import Quote from "../models/quotes.model.js";
import { IRepository, IQuote } from "../interfaces/index.js";
import mongoose from "mongoose";

export default class QuoteRespository implements IRepository<IQuote> {
  add(element: IQuote) {}

  remove(id: string) {}

  async get(id: string): Promise<IQuote | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    const quote = await Quote.findById(id).lean().exec();
    return quote;
  }

  async find(filter: {}): Promise<IQuote[]> {
    const quotes = await Quote.find(filter).lean().populate("stoic", "name");
    return quotes;
  }

  async aggregate(pipeline: mongoose.PipelineStage[]): Promise<IQuote[]> {
    const quotes = await Quote.aggregate(pipeline);
    return quotes;
  }
}

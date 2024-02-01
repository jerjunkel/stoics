import Quote from "../models/quotes.model.js";
import { IRepository, IQuote } from "../interfaces/index.js";

export default class QuoteRespository implements IRepository<IQuote> {
  add(element: IQuote) {}

  remove(id: string) {}

  async get(id: string): Promise<IQuote> {
    const quote = await Quote.findById(id).lean().exec();
    return quote as IQuote;
  }

  async find(filter: {}): Promise<IQuote[]> {
    const quotes = await Quote.find(filter).lean().populate("stoic", "name");
    return quotes as IQuote[];
  }

  static async readAll(filter: {}) {
    const quotes = await Quote.find(filter).lean().populate("stoic", "name");
    return quotes;
  }

  static async readOne(id: string) {
    const quote = await Quote.findById(id).lean().exec();
    return quote;
  }
}

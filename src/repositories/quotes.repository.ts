import Quote from "../models/quotes.model.js";
import { IRepository, IQuote } from "../interfaces/index.js";
import { QuoteDocument } from "../interfaces/Quote.js";

export default class QuoteRespository implements IRepository<IQuote> {
  add(element: IQuote) {}

  remove(id: string) {}

  async get(id: string): Promise<QuoteDocument | null> {
    const quote = await Quote.findById(id).lean().exec();
    return quote;
  }

  async find(filter: {}): Promise<QuoteDocument[]> {
    const quotes = await Quote.find(filter).lean().populate("stoic", "name");
    return quotes;
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

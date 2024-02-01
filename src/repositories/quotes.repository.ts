import Quote from "../models/quotes.model.js";

export default class QuoteRespository {
  constructor() {}

  static async readAll(filter: {}) {
    const quotes = await Quote.find(filter).lean().populate("stoic", "name");
    return quotes;
  }

  static async readOne(id: string) {
    const quote = await Quote.findById(id).lean().exec();
    return quote;
  }
}

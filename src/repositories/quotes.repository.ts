import Quote from "../models/quotes.model.js";
import { IRepository, IQuote } from "../interfaces/index.js";
import { PipelineStage, FilterQuery, isValidObjectId } from "mongoose";

export default class QuoteRespository implements IRepository<IQuote> {
  add(element: IQuote) {}

  remove(id: string) {}

  async get(id: string): Promise<IQuote | null> {
    if (!isValidObjectId(id)) return null;
    const quote = await Quote.findById(id).lean().exec();
    return quote;
  }

  async find(filter: FilterQuery<IQuote>): Promise<IQuote[]> {
    const quotes = await Quote.find(filter).lean().populate("stoic", "name");
    return quotes;
  }

  async findOne(filter: FilterQuery<IQuote>): Promise<IQuote | null> {
    const quote = await Quote.findOne(filter);
    return quote;
  }

  async update(
    filter: FilterQuery<IQuote>,
    update: Partial<IQuote>
  ): Promise<Boolean> {
    const quote = await Quote.updateOne(filter, update, { new: true });
    return quote.acknowledged;
  }

  async aggregate(pipeline: PipelineStage[]): Promise<IQuote[]> {
    const quotes = await Quote.aggregate(pipeline);
    return quotes;
  }
}

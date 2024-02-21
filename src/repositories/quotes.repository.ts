import Quote from "../models/quotes.model.js";
import { IRepository, IQuote } from "../interfaces/index.js";
import { PipelineStage, FilterQuery, isValidObjectId } from "mongoose";

export default class QuoteRespository implements IRepository<IQuote> {
  async create(element: IQuote): Promise<IQuote> {
    const quote = await Quote.create(element);
    const id = quote._id;
    return { id, ...element };
  }

  async find(id: string): Promise<IQuote | null> {
    if (!isValidObjectId(id)) return null;
    const quote = await Quote.findById(id).lean().exec();
    return quote;
  }

  async findAll(filter: FilterQuery<IQuote>): Promise<IQuote[]> {
    const quotes = await Quote.find(filter).lean().populate("stoic", "name");
    return quotes;
  }

  // async update(
  //   filter: FilterQuery<IQuote>,
  //   update: Partial<IQuote>
  // ): Promise<Boolean> {
  //   const quote = await Quote.updateOne(filter, update, { new: true });
  //   return quote.acknowledged;
  // }

  async update(id: string, update: Partial<IQuote>): Promise<IQuote | null> {
    return null;
  }

  async delete(id: string): Promise<Boolean> {
    return false;
  }

  async aggregate(pipeline: PipelineStage[]): Promise<IQuote[]> {
    const quotes = await Quote.aggregate(pipeline);
    return quotes;
  }
}

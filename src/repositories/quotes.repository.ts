import Quote from "../models/quotes.model.js";
import { IRepository, IQuote } from "../interfaces/index.js";
import { PipelineStage, FilterQuery, isValidObjectId } from "mongoose";

export default class QuoteRespository implements IRepository<IQuote> {
  async create(element: IQuote): Promise<IQuote> {
    const quote = await Quote.create(element);
    const id = quote.id;
    return { id, ...element };
  }

  async find(id: string): Promise<IQuote | null> {
    if (!isValidObjectId(id)) return null;
    const doc = await Quote.findById(id);
    return doc ? doc!.toObject() : null;
  }

  async findAll(filter: FilterQuery<IQuote>): Promise<IQuote[]> {
    const quotes = await Quote.find(filter);
    return quotes.map((quote) => quote.toObject());
  }

  async update(id: string, update: Partial<IQuote>): Promise<IQuote | null> {
    if (!isValidObjectId(id)) return null;
    const doc = await Quote.findByIdAndUpdate(id, update, { new: true });
    return doc ? doc!.toObject() : null;
  }

  async delete(id: string): Promise<Boolean> {
    if (!isValidObjectId(id)) return false;
    const success = await Quote.findByIdAndDelete(id);
    return success ? true : false;
  }

  async aggregate(pipeline: PipelineStage[]): Promise<IQuote[]> {
    const dbPipeline = [
      ...pipeline,
      {
        $addFields: { id: "$_id" },
      },
      {
        $unset: "_id",
      },
    ];
    const quotes: IQuote[] = await Quote.aggregate(dbPipeline);
    return quotes;
  }
}

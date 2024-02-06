import { IQuote, IService } from "../interfaces/index.js";
import QuoteRespository from "../repositories/quotes.repository.js";

export default class QuoteService implements IService<IQuote> {
  private _repository: QuoteRespository;

  constructor(repo: QuoteRespository) {
    this._repository = repo;
  }

  get repository(): QuoteRespository {
    return this._repository;
  }

  get currentDayNumber(): Number {
    const date = new Date();
    return Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
  }

  async getAllQuotes(): Promise<IQuote[]> {
    const quotes = await this._repository.find({});
    return quotes;
  }

  async getAQuoteByID(id: string) {
    const quote = await this._repository.get(id);
    return quote;
  }

  async getARandomQuote(): Promise<IQuote> {
    const quote = await this._repository.aggregate([{ $sample: { size: 1 } }]);
    return quote[0];
  }

  async getTodaysQuote(): Promise<IQuote> {
    const quote = await this._repository.find({ day: this.currentDayNumber });
    return quote[0];
  }
}

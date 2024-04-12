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

  get currentDayNumber(): number {
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
    const quotes = await this._repository.findAll({});
    return quotes;
  }

  async getAQuoteByID(id: string) {
    const quote = await this._repository.find(id);
    return quote;
  }

  async getARandomQuote(): Promise<IQuote> {
    const quote = await this._repository.aggregate([{ $sample: { size: 1 } }]);
    return quote[0];
  }

  async getTodaysQuote(): Promise<IQuote> {
    const results = await this._repository.findAll({
      day: this.currentDayNumber,
    });

    return results.length > 0 ? results[0] : await this.setTodaysQuote();
  }

  async setTodaysQuote(): Promise<IQuote> {
    const isTodayQuoteSet = await this.isTodayQuoteSet();
    if (isTodayQuoteSet) return await this.getTodaysQuote();

    const results = await this._repository.aggregate([
      {
        $match: {
          day: {
            $exists: false,
          },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    // Throw error if no quotes found
    if (results.length == 0) throw new Error("No available quotes in database");
    const random = results[0];
    const update = await this._repository.update(random.id!, {
      day: this.currentDayNumber,
    });

    return update!;
  }

  async isTodayQuoteSet(): Promise<Boolean> {
    const results = await this._repository.findAll({
      day: this.currentDayNumber,
    });
    return results.length > 0;
  }

  async addNewQuote(data: IQuote): Promise<IQuote> {
    return await this._repository.create(data);
  }
}

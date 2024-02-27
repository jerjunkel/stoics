import QuoteRepository from "../src/repositories/quotes.repository";
import { IQuote } from "../src/interfaces";
import db from "../src/config/db";
import sample from "./mock-samples";
const sut = new QuoteRepository();

const mockQuote: IQuote = sample.quote;

describe("CREATE", () => {
  it("should create a single quote", async () => {
    const quote = await sut.create(mockQuote);
    expect(quote).toHaveProperty("id");
    expect(quote.text).toBe(mockQuote.text);
  });
});

describe("READ Quotes from DB", () => {
  describe("Single quote", () => {
    it("should return a single quote", async () => {
      const createQuoted = await sut.create(mockQuote);
      const quote = await sut.find(createQuoted.id!);

      expect(quote).not.toBeNull();
      expect(quote).toHaveProperty("id");
      expect(createQuoted.id).toBe(quote?.id);
      expect(createQuoted.text).toBe(quote?.text);
    });

    it("should return null if quote is not found", async () => {
      const quote = await sut.find(mockQuote.id!);
      expect(quote).toBeNull();
    });

    it("should return an array of quotes", async () => {
      await sut.create(mockQuote);
      await sut.create(mockQuote);
      const quotes = await sut.findAll({});

      expect(Array.isArray(quotes)).toBe(true);
      expect(quotes.length).toBe(2);
    });
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017");
});

beforeEach(async () => {
  await db.dropCollection("quotes");
});

afterAll(async () => {
  await db.dropCollection("quotes");
  await db.disconnect();
});

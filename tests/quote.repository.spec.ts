import QuoteRepository from "../src/repositories/quotes.repository";
import { IQuote } from "../src/interfaces";
import db from "../src/config/db";
import sample from "./mock-samples";
const sut = new QuoteRepository();

const mockQuote: IQuote = sample.quote;
const mockID = sample.id;

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
      const quote = await sut.find(mockID());
      expect(quote).toBeNull();
    });

    it("should return null if ID is invalid", async () => {
      const quote = await sut.find(mockID());
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
describe("UPDATE", () => {
  it("should update a single quote by id", async () => {
    const updates: Partial<IQuote> = { text: "Foo is bar and bar is foo foo" };
    const newQuote = await sut.create(mockQuote);
    const updatedQuote = await sut.update(newQuote.id!, updates);

    expect(updatedQuote).not.toBeNull();
    expect(newQuote.id).toBe(updatedQuote?.id);
    expect(updatedQuote?.text).toBe(updates.text);
  });

  it("should return null if no quote is found", async () => {
    const quote = await sut.update(mockID(), {
      text: "Foo is not bar",
    });
    expect(quote).toBeNull();
  });

  it("should return null ID is invalid", async () => {
    const quote = await sut.update(mockID(), { text: "Foo is not bar" });
    expect(quote).toBeNull();
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

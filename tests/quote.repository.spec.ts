import QuoteRepository from "../src/repositories/quotes.repository";
import db from "../src/config/db";
import { Types } from "mongoose";
import { IQuote } from "../src/interfaces";
const sut = new QuoteRepository();

const mockQuote: IQuote = {
  text: "Waste no more time arguing what a good man should be. Be One.",
  source: "n/a",
  tags: [],
  stoic: new Types.ObjectId(),
  flag: true,
};

describe("CREATE", () => {
  it("should create a single quote", async () => {
    const quote = await sut.create(mockQuote);
    expect(quote).toHaveProperty("id");
    expect(quote.text).toBe(mockQuote.text);
  });
});

describe("READ Quotes from DB", () => {
  describe("Single quote", () => {
    it.todo("should return a single quote");
    it.todo("should return null if ");
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017");
});

afterAll(async () => {
  await db.dropCollection("quotes");
  await db.disconnect();
});

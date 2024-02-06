import QuoteService from "../src/services/quotes.service";
import QuoteRespository from "../src/repositories/quotes.repository";

const mockRepo = new QuoteRespository();
const sut = new QuoteService(mockRepo);
const spy = jest.spyOn(mockRepo, "find").mockResolvedValue([]);

afterAll(() => {
  spy.mockReset();
});

describe("Quote Service", () => {
  describe("get all quotes", () => {
    it("should be call repository once", async () => {
      await sut.getAllQuotes();
      expect(spy.mock.calls).toHaveLength(1);
    });

    it("should return an array", async () => {
      const quotes = await sut.getAllQuotes();
      expect(Array.isArray(quotes)).toBe(true);
    });
  });

  describe("aggregation", () => {
    it("should return a random quote", async () => {
      const quote = await sut.getARandomQuote();
      expect(quote).toMatchObject(
        expect.objectContaining({
          quote: expect.any(String),
          stoic: expect.any(String),
          tags: expect.any(String),
        })
      );
    });
  });
});

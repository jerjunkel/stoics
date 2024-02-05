import QuoteService from "../src/services/quotes.service";
import QuoteRespository from "../src/repositories/quotes.repository";

const mockRepo = new QuoteRespository();
const mockService = new QuoteService(mockRepo);
const spy = jest.spyOn(mockRepo, "find").mockResolvedValue([]);

afterAll(() => {
  spy.mockReset();
});

describe("Quote Service", () => {
  describe("get all quotes", () => {
    it("should be call repository once", async () => {
      await mockService.getAllQuotes();
      expect(spy.mock.calls).toHaveLength(1);
    });

    it("should return an array", async () => {
      const quotes = await mockService.getAllQuotes();
      expect(Array.isArray(quotes)).toBe(true);
    });
  });
});

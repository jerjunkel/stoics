import QuoteService from "../src/services/quotes.service";
import QuoteRespository from "../src/repositories/quotes.repository";
import { IQuote } from "../src/interfaces";

const mockRepo = new QuoteRespository();
const sut = new QuoteService(mockRepo);
const mockQuote: IQuote = {
  text: "some inspirational quote",
  source: "n/a",
  tags: [{ name: "love", description: "" }],
  stoic: {
    name: "mock stoic",
    bio: "some bio",
    image: "img url",
  },
  flag: true,
};
const mockRepoFindSpy = jest.spyOn(mockRepo, "find").mockResolvedValue([]);
const mockRepoAggregateSpy = jest.spyOn(mockRepo, "aggregate");

afterAll(() => {
  jest.clearAllMocks();
});

describe("Quote Service", () => {
  describe("get all quotes", () => {
    it("should be call repository once", async () => {
      await sut.getAllQuotes();
      expect(mockRepoFindSpy.mock.calls).toHaveLength(1);
    });

    it("should return an array", async () => {
      const quotes = await sut.getAllQuotes();
      expect(Array.isArray(quotes)).toBe(true);
    });
  });

  describe("aggregation", () => {
    it("should return a random quote", async () => {
      mockRepoAggregateSpy.mockResolvedValue([mockQuote]);
      const quote = await sut.getARandomQuote();

      expect(quote).toMatchObject(mockQuote);
    });
  });
});

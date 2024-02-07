import QuoteService from "../src/services/quotes.service";
import QuoteRespository from "../src/repositories/quotes.repository";
import { IQuote } from "../src/interfaces";
import { ErrorHandlingMiddlewareFunction } from "mongoose";
import { executionAsyncId } from "async_hooks";

interface IQuoteMockDTO extends IQuote {
  id: string;
}
const mockRepo = new QuoteRespository();
const sut = new QuoteService(mockRepo);
const mockQuote: IQuoteMockDTO = {
  id: "123",
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
const mockRepoGetOneSpy = jest.spyOn(mockRepo, "get");
const mockRepoFindOneSpy = jest.spyOn(mockRepo, "findOne");
const mockRepoUpdateSpy = jest.spyOn(mockRepo, "update");
const sutMockSetQuote = jest.spyOn(sut, "setTodaysQuote");
const mockCurrentDayNumber = () => {
  const date = new Date();
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
};

afterEach(() => {
  jest.clearAllMocks();
  mockRepoGetOneSpy.mockClear();
});

describe("Quote Service", () => {
  describe("get a quote by ID", () => {
    it("should return a single quote if ID is found", async () => {
      mockRepoGetOneSpy.mockResolvedValue(mockQuote);
      const quote = (await sut.getAQuoteByID("123")) as IQuoteMockDTO;
      expect(quote.id).toEqual(mockQuote.id);
    });

    it("should return null when no quote is found", async () => {
      mockRepoGetOneSpy.mockResolvedValue(null);
      const quote = await sut.getAQuoteByID("456");
      expect(quote).toEqual(null);
    });

    it("should return null when ID is invalid mongoose ObjectID ", async () => {
      const qoute = await sut.getAQuoteByID("789");
      expect(qoute).toEqual(null);
    });
  });
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

  describe("random quotes", () => {
    it("should return a random quote", async () => {
      mockRepoAggregateSpy.mockResolvedValue([mockQuote]);
      const quote = await sut.getARandomQuote();
      expect(quote).toMatchObject(mockQuote);
    });
  });

  describe("daily quote", () => {
    it("should return the current day number", () => {
      const dayOfTheYear = sut.currentDayNumber;
      expect(mockCurrentDayNumber()).toEqual(dayOfTheYear);
      expect(typeof dayOfTheYear).toEqual("number");
    });

    it("should return a quote with day of year", async () => {
      mockRepoFindOneSpy.mockResolvedValue({
        ...mockQuote,
        day: mockCurrentDayNumber(),
      });
      const quote = await sut.getTodaysQuote();
      expect(quote?.day).toBe(mockCurrentDayNumber());
    });

    it("should return null if no quote is found", async () => {
      mockRepoFindOneSpy.mockResolvedValue(null);
      const quote = await sut.getTodaysQuote();
      expect(quote).toBe(null);
    });
  });
});

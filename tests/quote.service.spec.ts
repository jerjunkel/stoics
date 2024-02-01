import QuoteService from "../src/services/quotes.service";

const mockService = new QuoteService();
const spy = jest.spyOn(mockService.repository, "find").mockResolvedValue([]);

afterAll(() => {
  spy.mockReset();
});

describe("Quote Service tests", () => {
  it("should be call repository once", async () => {
    await mockService.getAllQuotes();
    expect(spy.mock.calls).toHaveLength(1);
  });

  it("should return an array", async () => {
    const quotes = await mockService.getAllQuotes();
    expect(Array.isArray(quotes)).toBe(true);
  });
});

import { findAllQuotes } from "../src/services/quotes";
import QuoteRespository from "../src/repositories/quotes.repository";

const spy = jest.spyOn(QuoteRespository, "readAll").mockResolvedValue([]);

afterAll(() => {
  spy.mockReset();
});
describe("Quote Service tests", () => {
  it("should return an array", async () => {
    const quotes = await findAllQuotes();
    expect(Array.isArray(quotes)).toBe(true);
  });
});

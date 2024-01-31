import request from "supertest";
import app from "../src/app";
import QuoteService from "../src/services/quotes";

beforeAll(() => {
  //dbconnect
});

afterAll(() => {
  //dbclose
});

describe("GET /api/qoutes", () => {
  describe("a quote with an id was found", () => {
    // jest.spyOn(QuoteService, "getAQuote").mockResolvedValueOnce(mockQuote);
    const endpoint = "/quotes/123";
    const mockQuote = {
      id: "123",
      stoic: "foo",
      text: "foobar foo bar",
    };

    it("should return status code of 200", async () => {
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.statusCode).toBe(200);
    });
    it.todo("should return json content type");
    it.todo("should return payload with id");
  });
  it("should return a single quote", async () => {
    const mockQuote = {
      id: "123",
      stoic: "foo",
      text: "foobar foo bar",
    };

    //@ts-ignore
    jest.spyOn(QuoteService, "getQuoteByID").mockResolvedValueOnce(mockQuote);
    const sut = request(app());
    const response = await sut.get("/quotes/123");
    expect(response.statusCode).toBe(200);
  });
});

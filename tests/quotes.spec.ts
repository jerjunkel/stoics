import request from "supertest";
import app from "../src/app";
import QuotesService from "../src/services/quotes";

beforeAll(() => {
  //dbconnect
});

afterAll(() => {
  //dbclose
});
const endpoint = "/quotes/123";

describe("GET /api/qoutes", () => {
  describe("a quote with an id was found", () => {
    beforeAll(() => {
      const mockQuote = {
        id: "123",
        stoic: "foo",
        text: "foobar foo bar",
      };

      const spy = jest.spyOn(QuotesService, "getQuoteByID");
      ///@ts-ignore
      spy.mockResolvedValue(mockQuote);
    });

    it("should return status code of 200", async () => {
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.statusCode).toBe(200);
    });

    it("should return json content type", async () => {
      const sut = request(app());
      const response = await sut.get(endpoint);

      expect(response.header["content-type"]).toMatch(/json/);
    });

    it("should return payload with id", async () => {
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.body.id).toBe("123");
    });
  });
  it.todo("should return a single quote");
});

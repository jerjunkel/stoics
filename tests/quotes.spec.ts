import request from "supertest";
import app from "../src/app";
import { getQuoteByID } from "../src/services/quotes";

const endpoint = "/quotes/123";

const mockQuote = {
  id: "123",
  stoic: "foo",
  text: "foobar foo bar",
};

jest.mock("../src/services/quotes", () => ({
  __esModule: true,
  getQuoteByID: jest.fn(),
}));

const mockQuotesByID = getQuoteByID as jest.Mock;

describe("GET /api/qoutes", () => {
  describe("a quote with an id was found", () => {
    it("should return status code of 200", async () => {
      mockQuotesByID.mockResolvedValue(mockQuote);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.statusCode).toBe(200);
    });

    it("should return json content type", async () => {
      mockQuotesByID.mockResolvedValue(mockQuote);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.header["content-type"]).toMatch(/json/);
    });

    it("should return payload with id", async () => {
      mockQuotesByID.mockResolvedValue(mockQuote);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.body.id).toBe("123");
    });

    it("should return a single quote", async () => {
      mockQuotesByID.mockResolvedValue(mockQuote);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.body).toMatchObject(mockQuote);
    });
  });

  describe("no quote was found", () => {
    it("should return status code of 404", async () => {
      mockQuotesByID.mockResolvedValue(null);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.statusCode).toBe(404);
    });
  });
});

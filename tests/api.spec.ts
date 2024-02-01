import request from "supertest";
import app from "../src/app";
import { IQuote } from "../src/interfaces";
import QuotesController from "../src/controllers/quotes.controller";

const endpoint = "/quotes/123";

const mockQuote: IQuote = {
  id: "123",
  //@ts-ignore
  stoic: "658746c5e6916643c3e694a9",
  text: "foobar foo bar",
  source: "",
  tag: [],
};

const mockController = QuotesController;
const spy = jest.spyOn(mockController.service.repository, "get");

afterAll(() => {
  spy.mockReset();
});

describe("GET /api/qoutes/123", () => {
  describe("a quote with an id was found", () => {
    it("should return status code of 200", async () => {
      spy.mockResolvedValue(mockQuote);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.statusCode).toBe(200);
    });

    it("should return json content type", async () => {
      spy.mockResolvedValue(mockQuote);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.header["content-type"]).toMatch(/json/);
    });

    it("should return payload with id", async () => {
      spy.mockResolvedValue(mockQuote);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.body.id).toBe("123");
      expect(response.statusCode).toBe(200);
      expect(response.header["content-type"]).toMatch(/json/);
    });

    it("should return a single quote", async () => {
      spy.mockResolvedValue(mockQuote);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(mockQuote);
      expect(response.header["content-type"]).toMatch(/json/);
    });
  });

  describe("no quote was found", () => {
    it("should return status code of 404", async () => {
      spy.mockResolvedValue(null);
      const sut = request(app());
      const response = await sut.get(endpoint);
      expect(response.statusCode).toBe(404);
    });
  });
});

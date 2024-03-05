import request from "supertest";
import app from "../../src/app";
import { IQuote } from "../../src/interfaces";
import db from "../../src/config/db";
import QuoteRespository from "../../src/repositories/quotes.repository";
import { Types } from "mongoose";

const endpoint = "/quotes";
const repo = new QuoteRespository();

const mockQuote: IQuote = {
  stoic: new Types.ObjectId("658746c5e6916643c3e694a9"),
  text: "foobar foo bar",
  tags: [],
};

describe("GET /api/quotes", () => {
  it("should respond with an array of quotes", async () => {
    const quotes = [
      {
        stoic: new Types.ObjectId("658746c5e6916643c3e694a9"),
        text: "foobar is a foo bar",
        tags: [],
      },
      {
        stoic: new Types.ObjectId("658746c5e6916643c3e694a9"),
        text: "it's raining lots of foos",
        tags: [],
      },
    ];

    for (const quote of quotes) {
      await repo.create(quote);
    }

    const sut = request(app());
    const response = await sut.get(`${endpoint}`);

    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(2);
  });
});

describe("GET /api/quotes/:id", () => {
  it("should respond with a single quote", async () => {
    const quote = await repo.create(mockQuote);
    const sut = request(app());
    const response = await sut.get(`${endpoint}/${quote.id}`);

    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.id).toBe(quote.id);
  });

  it("should respond with a status code of 404 if no quote is found", async () => {
    const sut = request(app());
    const response = await sut.get(`${endpoint}/658746c5e6916643c3e694a9`);

    expect(response.statusCode).toBe(404);
    expect(response.body.data).toBe(null);
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017");
});

afterAll(async () => {
  await db.dropCollection("quotes");
  await db.disconnect();
});

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

describe("GET /api/qoutes/:id", () => {
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

  it("should return status code of 404", async () => {
    const sut = request(app());
    const response = await sut.get(endpoint);
    expect(response.statusCode).toBe(404);
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017");
});

afterAll(async () => {
  await db.dropCollection("quotes");
  await db.disconnect();
});

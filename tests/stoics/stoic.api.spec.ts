import app from "../../src/app";
import request from "supertest";
import samples from "../mock-samples";
import db from "../../src/config/db";

const endpoint = "/stoics";

describe("GET /api/stoics", () => {
  it("should return an array of stoics", async () => {
    const sut = request(app());
    const response = await sut.get(endpoint);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.statusCode).toBe(200);
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017/");
});

afterAll(async () => {
  await db.dropCollection("stoics");
  await db.disconnect();
});

import app from "../../src/app";
import request from "supertest";
import db from "../../src/config/db";
import StoicRepository from "../../src/repositories/stoic.repository";

const sut = request(app());
const endpoint = "/stoics";
const repo = new StoicRepository();
describe("GET /api/stoics", () => {
  it("should return an array of stoics", async () => {
    const response = await sut.get(endpoint);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.statusCode).toBe(200);
  });

  it("should find a stoic by ID", async () => {
    const stoic = await repo.create({
      name: "Mario Smart",
      bio: "From the mushrom kindom",
      image: "https://mario-smart.jpg",
    });

    const response = await sut.get(`${endpoint}/${stoic.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.id).toBe(stoic.id);
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017/");
});

afterAll(async () => {
  await db.dropCollection("stoics");
  await db.disconnect();
});

import app from "../../src/app";
import request from "supertest";
import db from "../../src/config/db";
import StoicRepository from "../../src/repositories/stoic.repository";

const sut = request(app());
const endpoint = "/stoics";
const repo = new StoicRepository();

describe("GET /api/stoics", () => {
  it("should respond with an array of stoics", async () => {
    const response = await sut.get(endpoint);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/stoics/:id", () => {
  it("should respond with a stoic object", async () => {
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

  it("should respond with 400 status code and null if ID is invalid ", async () => {
    const response = await sut.get(`${endpoint}/foobar`);
    expect(response.statusCode).toBe(400);
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("should respond with 404 status code and null if stoic not found", async () => {
    const response = await sut.get(`${endpoint}/658746c7e6916643c3e6950a`);
    expect(response.statusCode).toBe(404);
    expect(response.body.data).toBe(null);
  });
});

describe("GET /api/stoics?name=foo", () => {
  it("should respond with an array of stoics", async () => {
    const stoics = [
      {
        name: "Foo Bar",
        bio: "Foo bar is smart",
        image: "https://foo-bar.jpg",
      },
      {
        name: "Bar Foo",
        bio: "Foo bar is intelligent",
        image: "https://bar-foo.jpg",
      },
      {
        name: "Billy Bob",
        bio: "Don't know much about billy bob",
        image: "https://billy-bob.jpg",
      },
    ];

    for (const stoic of stoics) {
      await repo.create(stoic);
    }

    const response = await sut.get(`${endpoint}?name=foo`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(2);
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017/");
});

afterAll(async () => {
  await db.dropCollection("stoics");
  await db.disconnect();
});

import IStoic from "../src/interfaces/Stoic";
import StoicRepository from "../src/repositories/stoic.repository";
import db from "../src/config/db";
import exp from "constants";
const sut = new StoicRepository();

const stoicMocks: IStoic[] = [
  {
    name: "Johnny Morron",
    image: "https://john-morron-pic.img",
    bio: "Some bio about the stoic",
  },
  {
    name: "Peggy Wisdom",
    image: "https://peggy-wise-pic.img",
    bio: "Some bio about the stoic",
  },
  {
    name: " Marco Smart",
    image: "https://marco-smart-pic.img",
    bio: "Some bio about the stoic",
  },
  {
    name: " John Doe",
    image: "https://marco-smart-pic.img",
    bio: "Some bio about the stoic",
  },
];

describe("CREATE", () => {
  it("should return the created stoic entity", async () => {
    const stoic = await sut.create(stoicMocks[0]);
    expect(stoic).toHaveProperty("id");
    expect(stoic.name).toEqual(stoicMocks[0].name);
  });

  it("should throw an error if duplicate record found ", async () => {
    await sut.create(stoicMocks[1]);
    expect(async () => {
      await sut.create(stoicMocks[1]);
    }).rejects.toThrow();
  });
});

describe("READ", () => {
  it("should return a stoic entity", async () => {
    const stoic = await sut.create(stoicMocks[2]);

    if (stoic.id) {
      const query = await sut.find(stoic?.id);
      expect(query?.id).toBe(stoic.id);
    }
  });

  it("should return array of stoic entities", async () => {
    const { name } = await sut.create(stoicMocks[3]);
    const stoics = await sut.findAll({ name });
    expect(Array.isArray(stoics)).toEqual(true);
    expect(stoics[0].name).toBe(name);
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017");
});

afterAll(async () => {
  await db.dropCollection("stoics");
  await db.disconnect();
});

import IStoic from "../src/interfaces/Stoic";
import StoicRepository from "../src/repositories/stoic.repository";
import db from "../src/config/db";
const sut = new StoicRepository();

const stoics: IStoic[] = [
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
];

describe("CREATE", () => {
  it("should return the created stoic entity", async () => {
    const stoic = await sut.create(stoics[0]);
    expect(stoic).toHaveProperty("id");
    expect(stoic.name).toEqual(stoics[0].name);
  });

  it("should throw an error if duplicate record found ", async () => {
    await sut.create(stoics[1]);
    expect(async () => {
      await sut.create(stoics[1]);
    }).rejects.toThrow();
  });
});

describe("READ", () => {
  it("should return a stoic entity", async () => {
    const stoic = await sut.create(stoics[2]);

    if (stoic.id) {
      const query = await sut.find(stoic?.id);
      expect(query?.id).toBe(stoic.id);
    }
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017");
});

afterAll(async () => {
  await db.dropCollection("stoics");
  await db.disconnect();
});

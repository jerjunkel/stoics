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

  it("should return false if error is throw", async () => {
    const create1 = await sut.create(stoics[1]);
    const create2 = await sut.create(stoics[1]);
    expect(create1).toBe(true);
    expect(create2).toBe(false);
  });
});

beforeAll(async () => {
  try {
    await db.connect("mongodb://localhost:27017");
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  await db.dropCollection("stoics");
  await db.disconnect();
});

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

describe("CREATE OPERATIONS", () => {
  it("should create a single stoic entry", async () => {
    const create = await sut.create(stoics[0]);
    expect(create).toEqual(true);
  });
});

beforeAll(async () => {
  try {
    await db.connect("mongodb://localhost:27017");
  } catch (err) {
    console.log(err);
  }
});

beforeEach(async () => {
  await db.dropCollection("stoics");
});

afterAll(async () => {
  await db.disconnect();
});

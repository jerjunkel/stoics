import IStoic from "../src/interfaces/Stoic";
import StoicRepository from "../src/repositories/stoic.repository";

const sut = new StoicRepository();
const mockStoicItem: IStoic = {
  name: "Johnny Morron",
  image: "https://john-morron-pic.img",
  bio: "Some bio about the stoic",
};

describe("CRUD", () => {
  it("should create a stoic item", async () => {
    const create = sut.create(mockStoicItem);
    expect(create).toEqual(true);
  });
});

import IStoic from "../../src/interfaces/Stoic";
import StoicRepository from "../../src/repositories/stoic.repository";
import db from "../../src/config/db";

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
  {
    name: " Mary Jane",
    image: "https://mary-jane-pic.img",
    bio: "Some bio about the stoic",
  },
  {
    name: "Deleted Stoic",
    image: "https://delete-stoic-pic.img",
    bio: "Some bio about the stoic",
  },
];
const mockID = "658746c6e6916643c3e69503";

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
  it("should return a stoic entity if found", async () => {
    const stoic = await sut.create(stoicMocks[2]);

    if (stoic.id) {
      const query = await sut.find(stoic?.id);
      expect(query?.id).toBe(stoic.id);
    }
  });

  it("should return null if no stoic is found", async () => {
    const stoic = await sut.find(mockID);
    expect(stoic).toBeNull();
  });

  it("should return array of stoic entities", async () => {
    const { name } = await sut.create(stoicMocks[3]);
    const stoics = await sut.findAll({ name });
    expect(Array.isArray(stoics)).toEqual(true);
    expect(stoics[0].name).toBe(name);
  });
});

describe("UPDATE", () => {
  it("should update stoic entity if found", async () => {
    const stoic = await sut.create(stoicMocks[4]);
    const modifiedStoic = await sut.update(stoic.id!, {
      bio: "This is an update bio",
    });
    expect(modifiedStoic).not.toBeNull();
    expect(stoic.id).toBe(modifiedStoic?.id);
  });

  it("should return null if no stoic entity is found", async () => {
    const stoic = await sut.update(mockID, {
      name: "Unknown Stoic",
    });
    expect(stoic).toBeNull();
  });
});

describe("DELETE", () => {
  it("should delete stoic entity if found", async () => {
    const createdStoic = await sut.create(stoicMocks[5]);
    const deleted = await sut.delete(createdStoic.id!);
    expect(deleted).toBe(true);
  });

  it("should return false if no stoic entity is found", async () => {
    const deleted = await sut.delete(mockID);
    expect(deleted).toBe(false);
  });
});

beforeAll(async () => {
  await db.connect("mongodb://localhost:27017");
});

afterAll(async () => {
  await db.dropCollection("stoics");
  await db.disconnect();
});

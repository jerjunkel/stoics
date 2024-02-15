import StoicsService from "../src/services/stoics.service";
import StoicRepository from "../src/repositories/stoic.repository";
import IStoic from "../src/interfaces/Stoic";

const mockRepo = new StoicRepository();
const sut = new StoicsService(mockRepo);
const mockRepoFindSpy = jest.spyOn(mockRepo, "find");
const mockRepoFindAllSpy = jest.spyOn(mockRepo, "findAll");
const mockRepoUpdate = jest.spyOn(mockRepo, "update");
const mockRepoDelete = jest.spyOn(mockRepo, "delete");
const stoicMocks: IStoic[] = [
  {
    id: "658746c6e6916643c3e69503",
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
const stoicID = "658746c6e6916643c3e69503";

describe("Stoic Service", () => {
  it("should find a stoic by id", async () => {
    mockRepoFindSpy.mockResolvedValue(stoicMocks[0]);
    const stoic = await sut.findStoicByID(stoicID);
    expect(stoic).not.toBeNull();
    expect(stoic?.id).toBe(stoicMocks[0].id);
  });

  it("should return null if no stoic is found", async () => {
    mockRepoFindSpy.mockResolvedValue(null);
    const stoic = await sut.findStoicByID(stoicID);
    expect(stoic).toBeNull();
  });

  it("should return all stoics", async () => {
    mockRepoFindAllSpy.mockResolvedValue([]);
    const stoics = await sut.getAllStoics();
    expect(Array.isArray(stoics)).toBe(true);
  });

  it("should should update a stoic by id", async () => {
    mockRepoUpdate.mockResolvedValue(stoicMocks[0]);
    const newStoic = await sut.updateStoicByID(stoicID, {
      name: "Johnny Morron",
    });
    expect(newStoic!.name).toBe("Johnny Morron");
  });

  it("should delete a stoic by id", async () => {
    mockRepoDelete.mockResolvedValue(true);
    const acknowledge = await sut.deleteStoicByID(stoicID);
    expect(acknowledge).toBe(true);
  });

  it.todo("should return a stoic and their quotes");
  it.todo("should return an empty array if nothing is found");
});

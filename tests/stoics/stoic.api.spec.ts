import app from "../../src/app";
import request from "supertest";
import samples from "../mock-samples";
import StoicsService from "../../src/services/stoics.service";

const listAllStoicsSpy = jest.spyOn(StoicsService.prototype, "getAllStoics");
const endpoint = "/stoics";

describe("GET /api/stoics", () => {
  it("should return an array of stoics", async () => {
    listAllStoicsSpy.mockResolvedValue(samples.stoics);
    const sut = request(app());
    const response = await sut.get(endpoint);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.statusCode).toBe(200);
  });
});

beforeAll(() => {
  listAllStoicsSpy.mockClear();
});

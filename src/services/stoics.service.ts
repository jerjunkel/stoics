import IService from "../interfaces/Service.js";
import IStoic from "../interfaces/Stoic.js";
import StoicRepository from "../repositories/stoic.repository.js";

export default class StoicsService implements IService<IStoic> {
  constructor(private _repository: StoicRepository) {}

  get repository(): StoicRepository {
    return this._repository;
  }

  async addNewStoic(data: IStoic): Promise<IStoic> {
    return this._repository.create(data);
  }
  async findStoicByID(id: string): Promise<IStoic | null> {
    return this._repository.find(id);
  }

  async getAllStoics(): Promise<IStoic[]> {
    return this._repository.findAll({});
  }

  async updateStoicByID(
    id: string,
    update: Partial<IStoic>
  ): Promise<IStoic | null> {
    return this._repository.update(id, update);
  }
  async deleteStoicByID(id: string): Promise<Boolean> {
    return this._repository.delete(id);
  }
}

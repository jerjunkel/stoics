import IService from "../interfaces/Service.js";
import IStoic from "../interfaces/Stoic.js";
import StoicRepository from "../repositories/stoic.repository.js";

export default class StoicsService implements IService<IStoic> {
  constructor(private _repository: StoicRepository) {}

  get repository(): StoicRepository {
    return this._repository;
  }

  async findStoicByID(id: string): Promise<IStoic | null> {
    return this._repository.find(id);
  }
}

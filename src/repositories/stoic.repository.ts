import IRepository from "../interfaces/Repository.js";
import IStoic from "../interfaces/Stoic.js";
import Stoic from "../models/stoics.model.js";

export default class StoicRepository implements IRepository<IStoic> {
  create(element: IStoic): Boolean {
    return true;
  }
  remove(id: string): void {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<IStoic | null> {
    throw new Error("Method not implemented.");
  }
  find(filter: {}): Promise<IStoic[]> {
    throw new Error("Method not implemented.");
  }
}

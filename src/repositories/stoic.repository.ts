import IRepository from "../interfaces/Repository.js";
import IStoic from "../interfaces/Stoic.js";
import Stoic from "../models/stoics.model.js";

export default class StoicRepository implements IRepository<IStoic> {
  async create(element: IStoic): Promise<IStoic> {
    const stoic = await Stoic.create(element);
    const id = stoic._id.toString();
    return { id, ...element };
  }
  remove(id: string): void {
    throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<IStoic | null> {
    const stoic = await Stoic.findById(id);
    return stoic;
  }
  find(filter: {}): Promise<IStoic[]> {
    throw new Error("Method not implemented.");
  }
}

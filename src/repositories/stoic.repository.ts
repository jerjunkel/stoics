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
  async find(id: string): Promise<IStoic | null> {
    const stoic = await Stoic.findById(id);
    return stoic;
  }
  async findAll(filter: {}): Promise<IStoic[]> {
    const stoics = await Stoic.find(filter);
    return stoics;
  }
}

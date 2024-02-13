import IRepository from "../interfaces/Repository.js";
import IStoic from "../interfaces/Stoic.js";
import Stoic from "../models/stoics.model.js";

export default class StoicRepository implements IRepository<IStoic> {
  async create(element: IStoic): Promise<IStoic> {
    const stoic = await Stoic.create(element);
    const id = stoic._id.toString();
    return { id, ...element };
  }

  async find(id: string): Promise<IStoic | null> {
    const stoic = await Stoic.findById(id);
    return stoic;
  }
  async findAll(filter: {}): Promise<IStoic[]> {
    const stoics = await Stoic.find(filter);
    return stoics;
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(id: string, update: Partial<IStoic>): Promise<IStoic | null> {
    const stoic = await Stoic.findByIdAndUpdate(id, update);
    return stoic;
  }
}

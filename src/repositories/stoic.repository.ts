import IRepository from "../interfaces/Repository.js";
import IStoic from "../interfaces/Stoic.js";
import Stoic from "../models/stoics.model.js";

export default class StoicRepository implements IRepository<IStoic> {
  async create(element: IStoic): Promise<IStoic> {
    const stoic = await Stoic.create(element);
    return stoic.toObject();
  }

  async find(id: string): Promise<IStoic | null> {
    const stoic = await Stoic.findById(id);
    return stoic ? stoic.toObject() : null;
  }
  async findAll(filter: {}): Promise<IStoic[]> {
    const stoics = await Stoic.find(filter);
    return stoics;
  }

  async delete(id: string): Promise<Boolean> {
    const success = await Stoic.findByIdAndDelete(id);
    return success ? true : false;
  }

  async update(id: string, update: Partial<IStoic>): Promise<IStoic | null> {
    const stoic = await Stoic.findByIdAndUpdate(id, update);
    return stoic ? stoic.toObject() : null;
  }
}

import { Request, Response } from "express";
import StoicRepository from "../repositories/stoic.repository.js";
import StoicsService from "../services/stoics.service.js";
import IStoic from "../interfaces/Stoic.js";
import { addResourceType } from "../utils/api.js";

const service = new StoicsService(new StoicRepository());

const listAllStoics = async (req: Request, res: Response) => {
  const stoics = await service.getAllStoics();
  res.status(200).json({
    data: addResourceType<IStoic>("stoics", stoics),
  });
};

const findStoicByID = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const stoic = await service.findStoicByID(id);
    res.status(200).json({ data: addResourceType<IStoic>("stoics", stoic!) });
  } catch (err) {
    res.status(404).json({ data: null });
  }
};

export { findStoicByID, listAllStoics };

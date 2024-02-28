import { Request, Response } from "express";
import Stoic from "../models/stoics.model.js";
import StoicRepository from "../repositories/stoic.repository.js";
import StoicsService from "../services/stoics.service.js";
import IStoic from "../interfaces/Stoic.js";
import { addResourceType } from "../utils/api.js";

const service = new StoicsService(new StoicRepository());

const getAllStoics = async (req: Request, res: Response) => {
  const stoics = await service.getAllStoics();
  res.status(200).json({
    data: addResourceType<IStoic>("stoics", stoics),
  });
};

const getAStoic = async (req: Request, res: Response) => {
  const id = req.params.id;
  const stoic = await Stoic.findById(id);
  res.status(200).json({ data: stoic?.toObject() });
};

export { getAStoic, getAllStoics };

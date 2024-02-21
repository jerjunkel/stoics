import { Request, Response } from "express";
import Stoic from "../models/stoics.model.js";
import StoicRepository from "../repositories/stoic.repository.js";
import StoicsService from "../services/stoics.service.js";

const service = new StoicsService(new StoicRepository());

const getAllStoics = async (req: Request, res: Response) => {
  const stoics = await service.getAllStoics();
  res.status(200).json(stoics);
};

const getAStoic = async (req: Request, res: Response) => {
  const id = req.params.id;
  const stoic = await Stoic.findById(id);
  res.send(stoic);
};

export { getAStoic, getAllStoics };

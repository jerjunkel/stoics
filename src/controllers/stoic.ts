import { Request, Response } from "express";
import Stoic from "../models/Stoic.js";

const getAllStoics = async (req: Request, res: Response) => {
  const stoics = await Stoic.find({});
  res.send(stoics);
};

const getAStoic = async (req: Request, res: Response) => {
  const id = req.params.id;
  const stoic = await Stoic.findById(id);
  res.send(stoic);
};

export { getAStoic, getAllStoics };

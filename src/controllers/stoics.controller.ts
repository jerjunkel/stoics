import { Request, Response } from "express";
import StoicRepository from "../repositories/stoic.repository.js";
import StoicsService from "../services/stoics.service.js";
import IStoic from "../interfaces/Stoic.js";
import { addResourceType } from "../utils/api.js";

const service = new StoicsService(new StoicRepository());

const listAllStoics = async (req: Request, res: Response) => {
  const { name } = req.query;
  const stoics = name
    ? await service.findStoicByName(name as string)
    : await service.getAllStoics();

  res.status(200).json({
    data: addResourceType<IStoic>("stoics", stoics),
  });
};

const findStoicByID = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const stoic = await service.findStoicByID(id);
    res
      .status(stoic ? 200 : 404)
      .json({ data: stoic ? addResourceType<IStoic>("stoics", stoic) : null });
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .json({ errors: [{ title: "client_error", detail: err.message }] });
    }

    res
      .status(400)
      .json({ errors: [{ title: "client_error", detail: "Bad request" }] });
  }
};

export { findStoicByID, listAllStoics };

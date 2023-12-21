import { Request, Response } from "express";
import Tag from "../models/Tag.js";

const getAllTags = async (req: Request, res: Response) => {
  const tags = await Tag.find({});
  res.send(tags);
};

const getATag = async (req: Request, res: Response) => {
  const id = req.params.id;
  const tag = await Tag.findById(id);
  res.send(tag);
};

export { getAllTags, getATag };

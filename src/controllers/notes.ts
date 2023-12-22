import Note from "../models/Note.js";
import { Request, Response } from "express";

const getNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  res.send(note);
};
const getNotes = async (req: Request, res: Response) => {
  const notes = await Note.find({});
  res.send(notes);
};

const createNote = async (req: Request, res: Response) => {
  const { title, body, quoteID } = req.body;
  const note = await Note.create({ title, body, quote: quoteID });
  res.send(note);
};

const updateNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const note = await Note.updateOne(
    { _id: id },
    { editAt: new Date().toISOString(), ...req.body }
  );
  res.send(note);
};

const deleteNote = async (req: Request, res: Response) => {
  const _id = req.params.id;
  const note = await Note.deleteOne({ _id });
  res.send(note);
};

export { getNote, getNotes, createNote, updateNote, deleteNote };

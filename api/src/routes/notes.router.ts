import { Router } from "express";
import {
  getNote,
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controller.js";

const router = Router();

router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);
router.route("/").get(getNotes).post(createNote);

export default router;

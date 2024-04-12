import { Router } from "express";
import {
  listAllStoics,
  findStoicByID,
  findStoicQuotes,
} from "../controllers/stoics.controller.js";

const router = Router();

router
  .get("/", listAllStoics)
  .get("/:id", findStoicByID)
  .get("/:id/quotes", findStoicQuotes);

export default router;

import { Router } from "express";
import {
  listAllStoics,
  findStoicByID,
} from "../controllers/stoics.controller.js";

const router = Router();

router.get("/", listAllStoics).get("/:id", findStoicByID);

export default router;

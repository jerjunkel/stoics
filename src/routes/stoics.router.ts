import { Router } from "express";
import { getAllStoics, getAStoic } from "../controllers/stoics.controller.js";

const router = Router();

router.get("/", getAllStoics).get("/:id", getAStoic);

export default router;

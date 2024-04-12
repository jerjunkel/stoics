import { Router } from "express";
import { getAllTags, getATag } from "../controllers/tags.controller.js";

const router = Router();

router.get("/", getAllTags).get("/:id", getATag);

export default router;

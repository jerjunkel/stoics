import { Router } from "express";
import { getAllTags, getATag } from "../controllers/tag.js";

const router = Router();

router.get("/", getAllTags).get("/:id", getATag);

export default router;

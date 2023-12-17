import { Router } from "express";
import {
  getAllQuotes,
  getAQuote,
  getTodayQuote,
} from "../controllers/quote.js";

const router = Router();

router.get("/daily", getTodayQuote);
router.get("/", getAllQuotes).get("/:id", getAQuote);

export default router;

import { Router } from "express";
import {
  getAllQuotes,
  getAQuote,
  getTodayQuote,
  getARandomQuote,
} from "../controllers/quote.js";

const router = Router();

router.get("/daily", getTodayQuote);
router.get("/random", getARandomQuote);
router.get("/", getAllQuotes).get("/:id", getAQuote);

export default router;

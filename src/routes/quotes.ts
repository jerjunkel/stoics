import { Router } from "express";
import { getAllQuotes, getAQuote } from "../controllers/quote.js";

const router = Router();

router.get("/", getAllQuotes).get("/:id", getAQuote);

export default router;

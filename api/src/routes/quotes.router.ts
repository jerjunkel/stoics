import { Router } from "express";
import controller from "../controllers/quotes.controller.js";

const router = Router();

router.get("/daily", controller.getTodayQuote);
router.get("/random", controller.getARandomQuote);
router.get("/", controller.listAllQuotes).get("/:id", controller.findQuoteByID);

export default router;

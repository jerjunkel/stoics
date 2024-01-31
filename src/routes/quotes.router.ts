import { Router } from "express";
import controller from "../controllers/quotes.controller.js";

const router = Router();

router.get("/daily", controller.getTodayQuote);
router.get("/random", controller.getARandomQuote);
router.get("/", controller.getAllQuotes).get("/:id", controller.getAQuote);

export default router;

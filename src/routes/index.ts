import { Router } from "express";
import quotesRouter from "./quotes.js";
import stoicsRouter from "./stoics.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("HELLO FROM ROUTER");
});

router.use("/quotes", quotesRouter);
router.use("/stoics", stoicsRouter);

export default router;

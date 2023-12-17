import { Router } from "express";
import quotesRoute from "./quotes.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("HELLO FROM ROUTER");
});

router.use("/quotes", quotesRoute);

export default router;

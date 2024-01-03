import { Router } from "express";
import quotesRouter from "./quotes.js";
import stoicsRouter from "./stoics.js";
import tagsRouter from "./tags.js";
import notesRouter from "./notes.js";
import authRouter from "./auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("HELLO FROM ROUTER");
});

router.use("/quotes", quotesRouter);
router.use("/stoics", stoicsRouter);
router.use("/tags", tagsRouter);
router.use("/notes", notesRouter);
router.use("/auth", authRouter);

export default router;

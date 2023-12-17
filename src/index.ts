import express, { Router } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

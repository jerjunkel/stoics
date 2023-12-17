import express, { Router } from "express";
import dbConnect from "./config/db.js";
import "dotenv/config";

// initalize express
const app = express();

// Connec to Database
dbConnect();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import express from "express";
import dbConnect from "./config/db.js";
import "dotenv/config";
import routes from "./routes/index.js";

// initalize express
const app = express();

// Connec to Database
dbConnect();

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

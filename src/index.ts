import express from "express";
import dbConnect from "./config/db.js";
import "dotenv/config";
import routes from "./routes/index.js";
import dailyQuoteJob from "./jobs/dailyqoute.js";

// initalize express
const app = express();

// Connect to Database
dbConnect();

app.use(express.json());
app.use(routes);

// Cron job to update daily quote route
dailyQuoteJob.start();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

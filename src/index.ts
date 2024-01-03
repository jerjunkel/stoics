import express from "express";
import dbConnect from "./config/db.js";
import routes from "./routes/index.js";
import dailyQuoteJob from "./jobs/dailyqoute.js";
import config from "./config/index.js";
import errorHandler from "./middlewares/erroHandler.js";

// initalize express
const app = express();

// Connect to Database
dbConnect();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

// Cron job to update daily quote route
dailyQuoteJob.start();

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});

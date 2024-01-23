import express from "express";
import routes from "./routes/index.js";
import dailyQuoteJob from "./jobs/dailyqoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import dbConnect from "./config/db.js";

export default () => {
  const app = express();

  // Connect to Database
  dbConnect();

  app.use(express.json());
  app.use(routes);
  app.use(errorHandler);

  // Cron job to update daily quote route
  dailyQuoteJob.start();

  return app;
};

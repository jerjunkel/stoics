import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

export default () => {
  const app = express();

  // Configure express
  app.use(express.json());
  app.use(routes);
  app.use(errorHandler);

  return app;
};

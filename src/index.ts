import makeApp from "./app.js";
import config from "./config/index.js";
import db from "./config/db.js";
import dailyQuoteJob from "./jobs/dailyqoute.js";

try {
  // initalize express
  const app = makeApp();
  const dbURI = config.db.URI as string;

  await db.connect(dbURI);
  dailyQuoteJob.start();

  app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
  });
} catch (error) {
  console.log(error);
}

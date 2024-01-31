import makeApp from "./app.js";
import config from "./config/index.js";
import dbConnect from "./config/db.js";
import dailyQuoteJob from "./jobs/dailyqoute.js";

// initalize express
const app = makeApp();

try {
  const db = await dbConnect();
  dailyQuoteJob.start();
  app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
  });
} catch (error) {
  console.log(error);
}

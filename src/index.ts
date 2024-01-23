import makeApp from "./app.js";
import config from "./config/index.js";

// initalize express
const app = makeApp();

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});

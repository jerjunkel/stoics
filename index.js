const express = require("express");
const app = express();
const morgan = require("morgan");
const qod = require("./routes/qod");
const quote = require("./routes/quote");
const dbConnect = require("./config/db");
const cron = require("cron");
const qodStore = require("./store/qod");

// Configure dot-env
require("dotenv").config();

// Connect to database
dbConnect();

// Check for initial QOD in store and update
if (qodStore.getters.getState().qod == "") {
  require("./utilities/setQOD")();
}

// Start QOD Cron job
require("./jobs/qodJob")(cron);

//////////////////////////////////////
////////////MIDDLEWARE////////////////

// Add Morgan Logger
app.use(morgan("dev"));

//////////////////////////////////////
////////////ROUTES////////////////

// Quote of the day route
app.use("/quote", quote);
app.use("/qod", qod);
app.use("/test", require("./routes/tests"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

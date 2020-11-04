const express = require("express");
const app = express();
const morgan = require("morgan");
const qod = require("./routes/qod");
const dbConnect = require("./config/db");
const cron = require("cron");
const qodStore = require("./store/qod");

// Configure dot-env
require("dotenv").config();

// Connect to database
dbConnect();

// Check for initial QOD in store and update
if (qodStore.getters.getState().qod == "") {
  require("./utilities/getRandomQuote")()
    .then((quote) => {
      qodStore.actions.update(quote);
    })
    .catch((err) => console.log(err));
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
app.use("/qod", qod);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

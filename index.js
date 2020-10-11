const express = require("express");
const app = express();
const morgan = require("morgan");
const qod = require("./routes/qod");

// Configure dot-env
require("dotenv").config();

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

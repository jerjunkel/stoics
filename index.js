const express = require("express");
const app = express();
const morgan = require("morgan");

//////////////////////////////////////
////////////MIDDLEWARE////////////////

// Add Morgan Logger
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

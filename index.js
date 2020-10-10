const express = require("express");
const app = express();
const morgan = require("morgan");

//////////////////////////////////////
////////////MIDDLEWARE////////////////
//////////////////////////////////////

// Add morgan logger middleware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("HELLO");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

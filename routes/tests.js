const express = require("express");
const router = express.Router();

router.get("/qod", (req, res) => {
  const quote = {
    text:
      "See how many are better off than you are, but consider how many are worse.",
    day: 337,
    source: "n/a",
    author: "Lucius Annaeus Seneca",
  };

  res.status(200).json(quote);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/quote");

router.get("/", controller.getRandomQuote);

module.exports = router;

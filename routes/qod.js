const express = require("express");
const router = express.Router();
const controller = require("../controllers/qod.js");

router.get("/", controller.getQOD);

module.exports = router;

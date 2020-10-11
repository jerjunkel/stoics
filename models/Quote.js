const mongoose = require("mongoose");
const schema = mongoose.Schema({
  day: {
    type: Number,
  },
  author: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quote", schema);

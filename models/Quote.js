const mongoose = require("mongoose");
const schema = mongoose.Schema({
  day: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quote", schema);

const mongoose = require("mongoose");
const schema = mongoose.Schema({
  day: {
    type: Number,
    min: 1,
    max: 366,
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
  flag: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Quote", schema);

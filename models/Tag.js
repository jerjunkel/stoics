const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["death", "life", "stoic"],
    unique: true,
    default: "stoic",
  },
});

module.exports = mongoose.model("Tag", schema);

const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Author", schema);

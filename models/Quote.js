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
  source: {
    type: String,
    default: "n/a",
    required: true,
  },
});

schema.methods.populateWithAuthorResource = async function () {
  try {
    const populatedResource = await this.model("Quote")
      .findById(this._id, "-_id")
      .populate({
        path: "author",
        select: "-_id",
      });
    return populatedResource;
  } catch (err) {
    console.log(err);
  }
};
module.exports = mongoose.model("Quote", schema);

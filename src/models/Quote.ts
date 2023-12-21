import mongoose from "mongoose";
import Quote from "../interfaces/Quote.js";

const schema = new mongoose.Schema<Quote>({
  day: {
    type: Number,
    min: 1,
    max: 366,
  },
  stoic: {
    type: mongoose.Types.ObjectId,
    ref: "Stoic",
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
  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

export default mongoose.model<Quote>("Quote", schema);

import { Schema, model, Types } from "mongoose";
import Quote from "../interfaces/Quote.js";

const schema = new Schema<Quote>({
  day: {
    type: Number,
    min: 1,
    max: 366,
  },
  author: {
    type: Types.ObjectId,
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
  tags: [
    {
      type: Types.ObjectId,
      ref: "Tag",
    },
  ],
});

export default model<Quote>("Quote", schema);

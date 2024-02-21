import { Schema, model, Types } from "mongoose";
import IQuote from "../interfaces/Quote.js";

const schema = new Schema<IQuote>({
  day: {
    type: Number,
    min: 1,
    max: 366,
  },
  stoic: {
    type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

export default model<IQuote>("Quote", schema);

import { Schema, model, Types } from "mongoose";
import Quote, { QuoteDocument } from "../interfaces/Quote.js";

const schema = new Schema<QuoteDocument, Quote>({
  day: {
    type: Number,
    min: 1,
    max: 366,
  },
  stoic: {
    type: Types.ObjectId,
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
      type: Types.ObjectId,
      ref: "Tag",
    },
  ],
});

export default model<QuoteDocument>("Quote", schema);

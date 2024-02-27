import { Schema, model, Types } from "mongoose";
import IQuote from "../interfaces/Quote.js";

const schema = new Schema(
  {
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
  },
  {
    toObject: {
      versionKey: false,
      transform: function (_, ret) {
        ret.id = ret._id.toString();

        // @ts-ignore
        delete ret["_id"];
      },
    },
  }
);

interface IQuoteDocument extends IQuote, Document {}

export default model<IQuoteDocument>("Quote", schema);

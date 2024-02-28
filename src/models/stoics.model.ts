import { Schema, model } from "mongoose";
import IStoic from "../interfaces/Stoic.js";

const schema = new Schema<IStoic>(
  {
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

export default model<IStoic>("Stoic", schema);

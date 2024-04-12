import { Schema, model } from "mongoose";
import Tag from "../interfaces/Tag.js";

const schema = new Schema<Tag>({
  name: {
    type: String,
    required: true,
    enum: ["death", "life", "stoic"],
    unique: true,
    default: "stoic",
  },
  description: String,
});

export default model<Tag>("Tag", schema);

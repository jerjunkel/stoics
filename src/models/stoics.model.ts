import { Schema, model } from "mongoose";
import IStoic from "../interfaces/Stoic.js";

const schema = new Schema<IStoic>({
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

export default model<IStoic>("Stoic", schema);

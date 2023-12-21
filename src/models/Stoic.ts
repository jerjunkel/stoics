import { Schema, model } from "mongoose";
import Stoic from "../interfaces/Stoic.js";

const schema = new Schema<Stoic>({
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

export default model<Stoic>("Stoic", schema);

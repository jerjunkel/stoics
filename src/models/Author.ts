import { Schema, model } from "mongoose";
import Author from "../interfaces/Author.js";

const schema = new Schema<Author>({
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

export default model<Author>("Author", schema);

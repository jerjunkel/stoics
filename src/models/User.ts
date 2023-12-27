import { Schema, SchemaType, model } from "mongoose";
import Note from "./Note.js";
import User from "../interfaces/User.js";

const schema = new Schema<User>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  notes: [Note],
});

export default model<User>("User", schema);

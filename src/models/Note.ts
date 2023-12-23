import { Schema, model } from "mongoose";
import Note from "../interfaces/Note.js";

const schema = new Schema<Note>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  quote: {
    type: Schema.ObjectId,
    ref: "Quote",
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
    immutable: true,
  },
  editAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

export default model<Note>("Note", schema);

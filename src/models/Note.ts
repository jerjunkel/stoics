import { Schema, model } from "mongoose";
import Note from "../interfaces/Note.js";
import Quote from "./Quote.js";
import User from "./User.js";

const schema = new Schema<Note>({
  title: String,
  body: String,
  // quote: Quote,
  // user: User,
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  editAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

export default model<Note>("Note", schema);

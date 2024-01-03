import { Schema, Types, model, Model } from "mongoose";
import IUser, { IUserMethods, UserModel } from "../interfaces/User.js";
import jwt from "jsonwebtoken";

const schema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  notes: {
    type: [Types.ObjectId],
    default: undefined,
  },
});

schema.method("getJWT", function getJWT() {
  const secret = process.env.JWT_SECRET || "thisisasecet";
  return jwt.sign({ id: this._id, emai: this.email }, secret, {
    expiresIn: "10m",
  });
});
export default model<IUser, UserModel>("User", schema);

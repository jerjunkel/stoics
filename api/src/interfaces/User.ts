import { JwtPayload } from "jsonwebtoken";
import { Types, Model } from "mongoose";

export default interface IUser {
  email: string;
  notes: [Types.ObjectId];
}

export interface IUserMethods {
  getJWT(): JwtPayload;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

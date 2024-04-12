import { Types } from "mongoose";

export function isValidObjectID(id: string): Boolean {
  return Types.ObjectId.isValid(id);
}

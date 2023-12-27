import { Types } from "mongoose";

export default interface User {
  name: string;
  notes: [Types.ObjectId];
}

import { Types } from "mongoose";
import Tag from "./Tag.js";

export default interface IQuote {
  id?: string;
  stoic: Types.ObjectId;
  text: string;
  day?: number;
  source: string;
  tags: Tag[];
  flag: boolean;
}

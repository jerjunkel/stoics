import { Document } from "mongoose";
import Stoic from "./Stoic.js";
import Tag from "./Tag.js";

export default interface IQuote {
  stoic: Stoic;
  text: string;
  day?: number;
  source: string;
  tags: [Tag];
  flag: boolean;
}

export interface QuoteDocument extends IQuote, Document {}

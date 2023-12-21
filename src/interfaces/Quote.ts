import Stoic from "./Stoic.js";
import Tag from "./Tag.js";

export default interface Quote {
  stoic: Stoic;
  text: string;
  day?: number;
  source: string;
  tags: [Tag];
  flag: boolean;
}

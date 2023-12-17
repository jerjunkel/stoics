import Author from "./Author.js";
import Tag from "./Tag.js";

export default interface Quote {
  author: Author;
  text: string;
  day?: number;
  source: string;
  tags: [Tag];
}

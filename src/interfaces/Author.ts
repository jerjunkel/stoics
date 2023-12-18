import Quote from "./Quote.js";
export default interface Author {
  name: string;
  bio: string;
  image: string;
  quotes: [Quote];
}

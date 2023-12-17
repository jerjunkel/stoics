import Quote from "./Quote.js";
export default interface Author {
  name: string;
  bio: string;
  img: string;
  quotes: [Quote];
}

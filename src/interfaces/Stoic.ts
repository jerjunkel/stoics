import Quote from "./Quote.js";
export default interface Stoic {
  name: string;
  bio: string;
  image: string;
  quotes: [Quote];
}

import User from "./User.js";
import Quote from "./Quote.js";

export default interface Note {
  title: string;
  content: string;
  user: User;
  quote: Quote;
  createdAt: string;
  editAt: string;
}

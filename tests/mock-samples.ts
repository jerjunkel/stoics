import { Types } from "mongoose";

export default {
  stoics: [],
  quotes: [
    {
      text: "Waste no more time arguing what a good man should be. Be One.",
      source: "n/a",
      tags: [],
      stoic: new Types.ObjectId(),
      flag: true,
    },
  ],
  quote: {
    text: "Waste no more time arguing what a good man should be. Be One.",
    source: "n/a",
    tags: [],
    stoic: new Types.ObjectId(),
    flag: true,
  },
  id: () => {
    return new Types.ObjectId().toString();
  },
};

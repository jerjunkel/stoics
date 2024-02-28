import { Types } from "mongoose";

export default {
  stoics: [
    {
      name: "Johnny Morron",
      image: "https://john-morron-pic.img",
      bio: "Some bio about the stoic",
    },
    {
      name: "Peggy Wisdom",
      image: "https://peggy-wise-pic.img",
      bio: "Some bio about the stoic",
    },
    {
      name: "Marco Smart",
      image: "https://marco-smart-pic.img",
      bio: "Some bio about the stoic",
    },
    {
      name: "John Doe",
      image: "https://marco-smart-pic.img",
      bio: "Some bio about the stoic",
    },
    {
      name: "Mary Jane",
      image: "https://mary-jane-pic.img",
      bio: "Some bio about the stoic",
    },
    {
      name: "Deleted Stoic",
      image: "https://delete-stoic-pic.img",
      bio: "Some bio about the stoic",
    },
  ],
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
  quoteWithID: {
    id: new Types.ObjectId().toString(),
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

const mongoose = require("mongoose");
const Quote = require("../models/Quote");
const Author = require("../models/Author");
const Tag = require("../models/Tag");
const fs = require("fs");
const path = require("path");
const quotesDir = "../_data";
require("dotenv").config();

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      console.log("Seeder connected to the database");
    } catch (err) {
      console.log(err);
    }
  });

  test("connection", async () => {
    const testdata = parseStoicData()[0];
    try {
      await add(testdata);
    } catch (err) {
      console.log(err);
    }
    expect(true).toBe(true);
  });
});

describe("json data", () => {
  test("get json data", () => {
    const jermaine = {
      name: "Jermaine",
      bio: "Just a really fun guy",
      quotes: [
        {
          quote: "Some weird quote",
          tags: ["death", "life"],
        },
        {
          quote: "Maybe another weird quote",
          tags: ["death"],
        },
        {
          quote: "I love to have cars in the future",
          tags: ["death", "life"],
        },
        {
          quote: "Maybe another quote",
          tags: ["death", "life"],
        },
      ],
    };
    const testdata = parseStoicData()[0];
    expect(jermaine).toEqual(testdata);
  });
});

const parseStoicData = () => {
  // Only get jermaine json files
  return fs
    .readdirSync(path.join(__dirname, quotesDir))
    .filter((file) => file == "jermaine.json")
    .map((file) => {
      const data = fs.readFileSync(path.join(__dirname, quotesDir, file));
      return JSON.parse(data);
    });
};

const createAuthor = async ({ name, bio }) => {
  let author = await Author.findOne({ name });

  if (!author) {
    // console.log(`No author found named ${name}`);
    author = await Author.create({
      name,
      bio,
    });
    // console.log(`Created author named ${name}`);
  }
  return author;
};

const createQuote = async (quote, author) => {
  return Quote.create({
    author,
    text: quote,
  });
};

// const add = async (data) => {
//   const { name, bio, quotes } = data;
//   const author = await createAuthor({ name, bio });
//   await createQuotes(quotes, author);
// };

async function createQuotes(quotes, author) {
  try {
    for (let quote of quotes) {
      const instance = new Quote({ quote: quote.quote, author });
      const tags = quote.tags.map(async (tag) => await createTag(tag));
      instance.tags = tags;
      // instance.save();
      console.log(instance);
    }
  } catch (err) {
    console.log(err);
  }
}

async function createTag(name) {
  try {
    let tag = await Tag.findOne({ name });
    if (!tag) {
      console.log(`No tag found named ${name}`);
      tag = await Tag.create({
        name,
      });
      console.log(`Created tag named ${name}`);
      return tag;
    }
  } catch (err) {
    console.log(err);
  }
}

async function add(data) {
  const { name, bio, quotes } = data;
  try {
    // Create author
    const author = new Author({ name, bio });

    for (let info of quotes) {
      const { quote: text, tags } = info;
      //Add quote
      const newQuote = new Quote({ text, author });
      // Add tags
      newQuote.tags = tags.map((tag) => new Tag({ name: tag }));
      newQuote.save();
      // console.log(newQuote);
    }
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      console.log(`Author named ${name} already in database`);
    }
    console.log(error);
  }
}

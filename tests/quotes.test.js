const mongoose = require("mongoose");
// const Quote = require("./models/Quote");
// const Author = require("./models/Author");
// const Tag = require("./models/Tag");
const fs = require("fs");
const path = require("path");
const quotesDir = "../_data";
require("dotenv").config();

describe("insert", () => {
  let connection;
  let db;

  //   beforeAll(async () => {
  //     try {
  //       await mongoose.connect(process.env.MONGO_URI, {
  //         useNewUrlParser: true,
  //         useUnifiedTopology: true,
  //         useFindAndModify: false,
  //         useCreateIndex: true,
  //       });
  //       console.log("Seeder connected to the database");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });

  //   test("connection", () => {
  //     expect(true).toBe(true);
  //   });
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
    const fetchedData = parseStoicData()[0];
    expect(jermaine).toEqual(fetchedData);
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

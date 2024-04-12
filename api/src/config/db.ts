import mongoose, { Mongoose } from "mongoose";

const connect = async (uri: string) => {
  const dbConnInstance = await mongoose.connect(uri);
  console.log(`MongoDB Connected: ${dbConnInstance.connection.host}`);
};

const disconnect = async () => {
  await mongoose.connection.close();
};

const dropCollection = async (collection: "stoics" | "quotes") => {
  await mongoose.connection.dropCollection(collection);
};

const drop = async () => {
  await mongoose.connection.dropDatabase();
};

export default { connect, disconnect, drop, dropCollection };

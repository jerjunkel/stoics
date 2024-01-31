import mongoose from "mongoose";

const connect = async (uri: string) => {
  const dbConnInstance = await mongoose.connect(uri);
  console.log(`MongoDB Connected: ${dbConnInstance.connection.host}`);
};

const disconnect = async () => {
  mongoose.connection.close();
};

const drop = async () => {
  mongoose.connection.dropDatabase();
};

export default { connect, disconnect, drop };

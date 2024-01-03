import mongoose from "mongoose";
import config from "./index.js";

const dbConnect = async () => {
  const dbConnInstance = await mongoose.connect(config.db.URI as string);

  console.log(`MongoDB Connected: ${dbConnInstance.connection.host}`);
};

export default dbConnect;

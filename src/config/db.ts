import mongoose from "mongoose";
const dbConnect = async () => {
  const dbConnInstance = await mongoose.connect(
    process.env.MONGO_URI as string
  );

  console.log(`MongoDB Connected: ${dbConnInstance.connection.host}`);
};

export default dbConnect;

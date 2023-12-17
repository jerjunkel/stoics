import mongoose from "mongoose";
const dbConnect = async () => {
  const dbConnInstance = await mongoose.connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );

  console.log(`MongoDB Connected: ${dbConnInstance.connection.host}`);
};

export default dbConnect;

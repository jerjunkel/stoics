const mongoose = require("mongoose");

const dbConnect = async () => {
  const dbConnInstance = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log(`MongoDB Connected: ${dbConnInstance.connection.host}`);
};

module.exports = dbConnect;

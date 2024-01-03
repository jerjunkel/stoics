import "dotenv/config";

export default {
  PORT: process.env.PORT || 5000,
  ENV: process.env.NODE_ENV || "development",
  db: { URI: process.env.MONGO_URI },
  jwt: {
    SECRET: process.env.JWT_SECRET || "dev@jerjunkel.com",
    EXPIRE: process.env.JWT_EXPIRE || "1hr",
  },
};

import mongoose from "mongoose";

const urls = {
  production: process.env.MONGO_DB || "mongodb://localhost/sunrinthon",
  development:
    process.env.MONGO_DB_DEV ||
    process.env.MONGO_DB ||
    "mongodb://localhost/sunrinthon_dev",
  test:
    process.env.MONGO_DB_TEST ||
    process.env.MONGO_DB ||
    "mongodb://localhost/sunrinthon_test"
};
mongoose.connect(urls[process.env.NODE_ENV || "development"], {
  useNewUrlParser: true,
  useCreateIndex: true
});

const mongoose = require("mongoose");

// use async await for promises
// with try / catch block
const connectDB = async () => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1/fambam", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("mongodb: fambam connected");
      })
      .catch((err) => {
        if (err) console.error(err.message);
        process.exit(1);
      });
  } catch (error) {
    if (err) console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

const mongoose = require("mongoose");
const config = require("config");

const database = async () => {
  try {
    await mongoose.connect(config.get("MongoDBURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Connected to MongoDB Atlas Cluster.");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = database;

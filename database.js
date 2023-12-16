const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectedLink = await mongoose.connect("ADD_YOUR_MONGODB_LINK");
    console.log(`db is connected: ${connectedLink.connection.host}`);
  } catch (error) {
    console.log(`something went wrong while connecting to db: ${error}`);
  }
};

module.exports = connectDB;

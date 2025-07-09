const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    if (connection) {
      console.log("MongoDB Connected Successfully.");
    }
  } catch (error) {
    console.log("Database Connection Failed.", error);
  }
};

module.exports = { initializeDatabase };

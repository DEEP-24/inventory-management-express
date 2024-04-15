const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Test:password1234@cluster0.kbovzuj.mongodb.net/assignment3"
    );
    console.log("Connected to Database successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected!");
  });
};

module.exports = connectDB;

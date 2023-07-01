import mongoose from "mongoose";
import User from "../models/userSchema.mjs";

const mongoDBURL = "mongodb://0.0.0.0:27017/reactWebApp";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;

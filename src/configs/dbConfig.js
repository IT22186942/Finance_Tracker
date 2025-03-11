import mongoose from "mongoose";
import { DATABASE_URL } from "./envConfig.js";

const connectDb = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to Database");
  } catch (err) {
    console.error(err);
  }
};

export default connectDb;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    const data = mongoose.connect(process.env.MONGO_URI);
    if (data) {
      console.log("Database connected Successfullu");
    }
  } catch (error) {
    console.log("Database connection error");
  }
};

export default dbConnect;

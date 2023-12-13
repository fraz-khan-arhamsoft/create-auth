import express from "express";
import userRouter from "./route/userRoute.js";
import dbConnect from "./config/dbConfig.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
dbConnect();

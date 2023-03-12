import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRoutes from "./routes/user.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
  }
};

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use("/api/user", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/post", postRouter);

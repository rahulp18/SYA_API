import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: ["email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: ["password is required"],
  },
});

export default mongoose.model("User", userSchema);

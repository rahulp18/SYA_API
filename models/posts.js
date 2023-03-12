import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  imageUrl: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  desc: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Post", postSchema);

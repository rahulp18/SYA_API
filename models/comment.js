import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;

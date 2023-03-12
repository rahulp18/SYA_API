import { response } from "express";
import CommentModel from "../models/comment.js";
import Post from "../models/posts.js";
import Cloudinary from "../utils/Cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const result = await Cloudinary.uploader.upload(req.file.path, {
      folder: "Development",
    });

    const newPost = await Post.create({
      desc: req.body.desc,
      imageUrl: result.url,
      user: req.user._id,
    });
    res
      .status(200)
      .json({ data: newPost, message: "Post Uploaded successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const uploadComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, parentCommentId } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    const parentComment = parentCommentId
      ? await CommentModel.findById(parentCommentId)
      : null;
    console.log(parentComment);
    const comment = new CommentModel({
      user: userId,
      text,
      post: postId,
      parentComment: parentCommentId,
    });
    await comment.save();
    if (parentComment) {
      parentComment.comments.push(comment._id);
      await parentComment.save();
    }
    return res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.dislikers.includes(userId)) {
      if (comment.dislikes > 0) {
        comment.dislikes--;
      }
      // console.log(comment.dislikers.filter((id) => id.toString() !== userId));
      comment.dislikers.pull(userId);
    }
    if (!comment.likers.includes(userId)) {
      comment.likes++;
      comment.likers.push(userId);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const disLikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.likers.includes(userId)) {
      if (comment.likes > 0) {
        comment.likes--;
      }

      comment.likers.pull(userId);
    }
    if (!comment.dislikers.includes(userId)) {
      comment.dislikes++;
      comment.dislikers.push(userId);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await CommentModel.find({ post: postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.likers.includes(userId)) {
      post.likes++;
      post.likers.push(userId);
    }
    if (post.dislikers.includes(userId)) {
      if (post.dislikes > 0) {
        post.dislikes--;
      }
      // console.log(comment.dislikers.filter((id) => id.toString() !== userId));
      post.dislikers.pull(userId);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const disLikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.dislikers.includes(userId)) {
      post.dislikes++;
      post.dislikers.push(userId);
    }
    if (post.likers.includes(userId)) {
      if (post.likes > 0) {
        post.likes--;
      }
      // console.log(comment.dislikers.filter((id) => id.toString() !== userId));
      post.likers.pull(userId);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

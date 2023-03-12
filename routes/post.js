import express from "express";
import {
  disLikeComment,
  disLikePost,
  getAllComments,
  getAllPosts,
  getPost,
  likeComment,
  likePost,
  uploadComment,
  uploadImage,
} from "../controllers/postCtrl.js";
import { checkAuth } from "../middlewares/verifyToken.js";
import { upload } from "../utils/multerUpload.js";
const router = express.Router();

router.post("/upload", checkAuth, upload.single("picture"), uploadImage);
router.post("/:postId/comments", checkAuth, uploadComment);
router.post("/comments/:commentId/like", checkAuth, likeComment);
router.post("/comments/:commentId/dislike", checkAuth, disLikeComment);
router.get("/:postId/comments", getAllComments);
router.get("/:postId", getPost);
router.get("/", getAllPosts);
router.post("/:postId/like", checkAuth, likePost);
router.post("/:postId/dislike", checkAuth, disLikePost);
export default router;

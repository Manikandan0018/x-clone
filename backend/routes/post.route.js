import express from "express";
import upload from "../middleware/Multer.js";
import {protectRoute} from "../middleware/protectRoute.js";
import { badComment } from "../controllers/comment.controller.js";

import {
  createPost,
  deletePost,
  postComment,
  likeUnlikePost,
  getAllPosts,
  getLikedPost,
  getFollowingPosts
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectRoute, upload.single("image"), createPost);
router.delete("/deletePost/:id", protectRoute, deletePost);
router.post("/PostComment/:id", protectRoute, postComment);
router.post("/likeUnlikePost/:id", protectRoute, likeUnlikePost);
router.get("/allPosts", protectRoute, getAllPosts);
router.get("/getLikedPost/:id", protectRoute, getLikedPost);
router.post("/badComment/:postId", protectRoute, badComment);
router.get('/following', protectRoute, getFollowingPosts);


export default router;

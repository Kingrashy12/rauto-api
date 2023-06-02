import express from "express";
import {
  createPost,
  getAllPost,
  getSinglePost,
  getUserPost,
} from "../controllers/Post.js";

const router = express.Router();

router.post("/sell", createPost);
router.get("/", getAllPost);
router.get("/:id", getSinglePost);
router.get("/:username", getUserPost);

export default router;

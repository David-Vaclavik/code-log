import express from "express";
import { getPosts } from "../controllers/postsController.js";
import { createPost } from "../controllers/postsController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);

export default router;

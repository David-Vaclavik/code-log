import express from "express";
import { getPosts } from "../controllers/postsController.js";
import { createPost } from "../controllers/postsController.js";
import { getPost } from "../controllers/postsController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);

export default router;

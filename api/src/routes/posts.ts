import express from "express";
import { editPost, getPosts } from "../controllers/postsController.js";
import { createPost } from "../controllers/postsController.js";
import { getPost } from "../controllers/postsController.js";
import { createComment, getComments } from "../controllers/commentsController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authenticate, createPost);
router.get("/:id", getPost);
router.put("/:id", authenticate, editPost);

router.get("/:id/comments", getComments);
router.post("/:id/comments", authenticate, createComment);

export default router;

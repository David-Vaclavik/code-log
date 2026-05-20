import { Request, Response } from "express";
import { getAllPosts, getPostById, insertPost, updatePost } from "../services/postsService.js";
import { Post } from "../types/types.js";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts: Post[] = await getAllPosts();

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Tags are optional, but if provided, they should be an array of strings.
export const createPost = async (req: Request, res: Response) => {
  const { title, description, content, tags } = req.body;

  if (!title?.trim() || !description?.trim() || !content) {
    return res.status(400).json({ error: "Title, description, and content are required" });
  }

  try {
    const post: Post = await insertPost(title, description, content, tags);

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const postId = Number(req.params.id); // params are always string

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    // also pg doesn't care if we pass a string or number as id, it will work either way,
    // but we want to validate that it's a number before querying the database
    const post: Post | null = await getPostById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// Tags are optional, but if provided, they should be an array of strings.
export const editPost = async (req: Request, res: Response) => {
  const postId = Number(req.params.id); // params are always string
  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  const { title, description, content, tags } = req.body;
  if (!title?.trim() || !description?.trim() || !content) {
    return res.status(400).json({ error: "Title, description, and content are required" });
  }

  try {
    const post: Post | null = await updatePost(postId, title, description, content, tags);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }
};

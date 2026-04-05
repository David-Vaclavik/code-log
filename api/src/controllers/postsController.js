import { getAllPosts, insertPost } from "../services/postsService.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const createPost = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const post = await insertPost(title, content, tags);

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

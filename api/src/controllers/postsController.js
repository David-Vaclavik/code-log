import { getAllPosts, getPostById, insertPost } from "../services/postsService.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Tags are optional, but if provided, they should be an array of strings.
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

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

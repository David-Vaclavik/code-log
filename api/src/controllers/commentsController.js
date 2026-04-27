import { getCommentsByPostId, insertComment } from "../services/commentsService.js";

export const getComments = async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const comments = await getCommentsByPostId(id);

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const createComment = async (req, res) => {
  const { id } = req.params;
  const { content, user_id } = req.body;
  // const userId = req.userId; //! This will be set by the auth middleware once we have it implemented.
  //! We don't have user authentication yet, so we'll just use a fake user ID for now.
  // Fake is hardcoded in the client, commments component

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  if (!Number.isInteger(Number(user_id))) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  if (!content?.trim()) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const comment = await insertComment(id, content, user_id);

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

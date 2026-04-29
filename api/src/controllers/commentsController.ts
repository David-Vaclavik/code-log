import { Request, Response } from "express";
import { getCommentsByPostId, insertComment } from "../services/commentsService.js";

export const getComments = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const comments = await getCommentsByPostId(Number(id));

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.userId; // This is set by the authenticate middleware.

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  if (!Number.isInteger(Number(userId))) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  if (!content?.trim()) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const comment = await insertComment(Number(id), content, Number(userId));

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

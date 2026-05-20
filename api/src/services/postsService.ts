import pool from "../db/pool.js";
import { JSONContent, Post } from "../types/types.js";

export const getAllPosts = async (): Promise<Post[]> => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
  return rows;
};

export const insertPost = async (
  title: string,
  description: string,
  content: JSONContent,
  tags?: string[]
): Promise<Post> => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, description, content, tags)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, description, content, tags ?? null]
  );

  return rows[0];
};

export const getPostById = async (id: number): Promise<Post | null> => {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return rows[0] || null;
};

export const updatePost = async (
  id: number,
  title: string,
  description: string,
  content: JSONContent,
  tags?: string[]
): Promise<Post | null> => {
  const { rows } = await pool.query(
    `UPDATE posts
     SET 
      title = $1,
      description = $2,
      content = $3,
      tags = $4,
      updated_at = NOW()
     WHERE id = $5
     RETURNING *`,
    [title, description, content, tags ?? null, id]
  );

  return rows[0] || null;
};

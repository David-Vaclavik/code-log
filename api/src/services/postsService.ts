import pool from "../db/pool.js";

export const getAllPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
  return rows;
};

export const insertPost = async (title: string, content: string, tags?: string[]) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, tags)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, content, tags ?? null]
  );

  return rows[0];
};

export const getPostById = async (id: number) => {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return rows[0];
};

export const updatePost = async (id: number, title: string, content: string, tags?: string[]) => {
  const { rows } = await pool.query(
    `UPDATE posts
     SET 
      title = $1,
      content = $2,
      tags = $3,
      updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [title, content, tags ?? null, id]
  );

  return rows[0];
};

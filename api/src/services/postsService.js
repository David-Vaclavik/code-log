import pool from "../db/pool.js";

export const getAllPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
  return rows;
};

export const insertPost = async (title, content, tags) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, tags)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, content, tags]
  );

  return rows[0];
};

export const getPostById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return rows[0];
};

import pool from "../db/pool.js";

export const getCommentsByPostId = async (postId) => {
  const { rows } = await pool.query(
    `SELECT comments.*, users.name AS user_name
     FROM comments
     JOIN users ON comments.user_id = users.id
     WHERE comments.post_id = $1
     ORDER BY comments.created_at DESC`,
    [postId]
  );

  return rows;
};

export const insertComment = async (postId, content, userId) => {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id, content, user_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [postId, content, userId]
  );

  return rows[0];
};

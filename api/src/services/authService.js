import pool from "../db/pool.js";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
};

export const createUser = async (name, email, passwordHash) => {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, passwordHash]
  );
  return rows[0];
};

export const verifyPassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};

export const hashPassword = async (plain) => {
  return bcrypt.hash(plain, 12);
  // $2b$12$<22-char-salt><31-char-hash>
  // $2b - bcrypt version
  // $12 - cost factor/work factor (2^12 = 4096 rounds)
  // <22-char-salt> - randomly generated salt
  // <31-char-hash> - hashed password
};

import pool from "../db/pool.js";
import bcrypt from "bcrypt";
import type { UserRow, User } from "../types/types.js";

export const createUser = async (
  name: string,
  email: string,
  passwordHash: string
): Promise<User> => {
  const { rows } = await pool.query<User>(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, is_admin`,
    [name, email, passwordHash]
  );
  return rows[0];
};

export const verifyPassword = async (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};

export const hashPassword = async (plain: string): Promise<string> => {
  return bcrypt.hash(plain, 12);
  // $2b$12$<22-char-salt><31-char-hash>
  // $2b - bcrypt version
  // $12 - cost factor/work factor (2^12 = 4096 rounds)
  // <22-char-salt> - randomly generated salt
  // <31-char-hash> - hashed password
};

export const findUserByEmail = async (email: string): Promise<UserRow | undefined> => {
  const { rows } = await pool.query<UserRow>("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
};

export const findUserById = async (id: number): Promise<User | undefined> => {
  const { rows } = await pool.query<User>(
    "SELECT id, name, email, is_admin FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
};

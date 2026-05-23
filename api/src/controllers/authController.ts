import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  verifyPassword,
  hashPassword,
  findUserById,
} from "../services/authService.js";
import type { UserRow, User } from "../types/types.js";
import { RegisterBody } from "../schemas/auth.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms - same as token expiration
} as const;

// Defines how to create a token
//    - used in AuthStatus component to display if the user is admin or not
const signToken = (userId: number, isAdmin = false) =>
  jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET!, {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as jwt.SignOptions["expiresIn"],
  });

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as RegisterBody;

  try {
    const existing: UserRow | undefined = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const passwordHash = await hashPassword(password);
    const user: User = await createUser(name, email, passwordHash);
    const token = signToken(user.id);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user: UserRow | undefined = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user.id, user.is_admin);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ user: { id: user.id, name: user.name, email: user.email, isAdmin: user.is_admin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.json({ message: "Logged out" });
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user: User | undefined = await findUserById(req.userId!);
    if (!user) return res.status(404).json({ error: "User not found" });

    // same response as in login above
    res.json({ user: { id: user.id, name: user.name, email: user.email, isAdmin: user.is_admin } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  verifyPassword,
  hashPassword,
} from "../services/authService.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

const signToken = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  });

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  try {
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser(name, email, passwordHash);
    const token = signToken(user.id);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "User doesn't exist" });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user.id);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const logout = (_req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.json({ message: "Logged out" });
};

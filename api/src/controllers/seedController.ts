import { Request, Response } from "express";
import { seedDatabase } from "../db/seed.js";

export const runSeed = async (_req: Request, res: Response) => {
  try {
    await seedDatabase();
    res.json({ message: "Database seeded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed database" });
  }
};

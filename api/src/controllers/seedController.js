import { seedDatabase } from "../db/seed.js";

export const runSeed = async (req, res) => {
  try {
    await seedDatabase();
    res.json({ message: "Database seeded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed database" });
  }
};

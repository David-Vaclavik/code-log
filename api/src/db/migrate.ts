import "dotenv/config";
import pool from "./pool.js";

// to run this migration:
// npx tsx src/db/migrate.ts

// await pool.query(`ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "content_json" JSONB`);
// console.log("Migration complete: added content_json column to posts");
// await pool.end();

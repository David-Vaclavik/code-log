import "dotenv/config";
import pool from "./pool.js";

// to run this migration:
// npx tsx src/db/migrate.ts

//TODO: later drop tables and create them again with the new schema
/*
await pool.query(`ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "content_json" JSONB`);
console.log("Migration complete: added content_json column to posts");
await pool.end();
*/

/*
await pool.query(`ALTER TABLE "posts" RENAME COLUMN "content" TO "description"`);
console.log("Migration complete: renamed content to description");

await pool.query(`ALTER TABLE "posts" RENAME COLUMN "content_json" TO "content"`);
console.log("Migration complete: renamed content_json to content");

await pool.end();
*/

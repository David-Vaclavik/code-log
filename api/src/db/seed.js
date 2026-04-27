import pool from "./pool.js";

export const seedDatabase = async () => {
  const client = await pool.connect(); // must use .release() at the end of the transaction
  // note: with .connect() we will have same created_at timestamps for all rows, which is fine for seeding

  try {
    await client.query("BEGIN");

    // Clear existing data (CASCADE handles FK order)
    await client.query("TRUNCATE users, posts, comments RESTART IDENTITY CASCADE");

    // Users
    await client.query(`
      INSERT INTO users (name, email, password_hash) VALUES
        ('David Václavík', 'david@example.com', 'password_hash_1'),
        ('Jane Doe', 'jane@example.com', 'password_hash_2'),
        ('John Smith', 'john@example.com', 'password_hash_3')
    `);

    // Posts
    await client.query(`
      INSERT INTO posts (title, content, tags, author, published) VALUES
        (
          'Getting Started with TypeScript',
          'TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. In this post we explore the basics of TypeScript and why you should consider using it in your next project.',
          ARRAY['TypeScript', 'JavaScript'],
          'David Václavík',
          TRUE
        ),
        (
          'Building a REST API with Express',
          'Express is a minimal and flexible Node.js web application framework. This post walks through building a REST API with Express, PostgreSQL, and proper error handling.',
          ARRAY['Node.js', 'Express', 'PostgreSQL'],
          'David Václavík',
          TRUE
        ),
        (
          'Draft Post - Work in Progress',
          'This post is not yet published and is still being written.',
          ARRAY['Draft'],
          'David Václavík',
          FALSE
        )
    `);

    // Posts using default values for optional fields
    await client.query(`
      INSERT INTO posts (title, content) VALUES
        ('Post without tags', 'This post does not have any tags.')
    `);

    // Posts with tags array
    await client.query(`
      INSERT INTO posts (title, content, tags) VALUES
        ('Resource Names for Enterprise TypeScript Monorepos', 'Multi-service TypeScript applications have a naming problem. Every service invents its own way to reference resources. One team builds paths with template literals, another passes loose IDs through function arguments, a third hardcodes service prefixes as magic strings. It works until someone joins the team and asks “how do I construct a resource path here?” and gets a different answer depending on which file they are looking at.', ARRAY['TypeScript', 'React'])
    `);

    // Comments
    await client.query(`
      INSERT INTO comments (content, post_id, user_id) VALUES
        ('Great article! Really helped me understand TypeScript.', 1, 2),
        ('Thanks for the clear explanation.', 1, 3),
        ('This is exactly what I was looking for!', 2, 2)
    `);

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

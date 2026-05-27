import pool from "./pool.js";
import bcrypt from "bcrypt";

export const seedDatabase = async () => {
  const client = await pool.connect(); // must use .release() at the end of the transaction
  // note: with .connect() we will have same created_at timestamps for all rows, which is fine for seeding

  try {
    await client.query("BEGIN");

    // Clear existing data (CASCADE handles FK order)
    await client.query("TRUNCATE users, posts, comments RESTART IDENTITY CASCADE");

    // Hash passwords before inserting
    const hash = (plain: string) => bcrypt.hash(plain, 12);

    // Admin insert
    await client.query(
      `INSERT INTO users (name, email, password_hash, is_admin) VALUES
        ($1, $2, $3, $4)`,
      ["David Václavík", "david@example.com", await hash("asdasdasd"), true]
    );

    // Normal users
    await client.query(
      `INSERT INTO users (name, email, password_hash) VALUES
        ($1, $2, $3), ($4, $5, $6), ($7, $8, $9)`,
      [
        "Raja Sykes",
        "raja@example.com",
        await hash("password1"),
        "Jane Doe",
        "jane@example.com",
        await hash("password2"),
        "John Smith",
        "john@example.com",
        await hash("password3"),
      ]
    );

    // Posts
    await client.query(
      `INSERT INTO posts (title, description, tags, author, published, content) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        "Getting Started with TypeScript",
        "TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. In this post we explore the basics of TypeScript and why you should consider using it in your next project.",
        ["TypeScript", "JavaScript"],
        "David Václavík",
        true,
        JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. In this post we explore the basics of TypeScript and why you should consider using it in your next project.",
                },
              ],
            },
          ],
        }),
      ]
    );

    await client.query(
      `INSERT INTO posts (title, description, tags, author, published, content) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        "Building a REST API with Express",
        "Express is a minimal and flexible Node.js web application framework. This post walks through building a REST API with Express, PostgreSQL, and proper error handling.",
        ["Node.js", "Express", "PostgreSQL"],
        "David Václavík",
        true,
        JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Express is a minimal and flexible Node.js web application framework. This post walks through building a REST API with Express, PostgreSQL, and proper error handling.",
                },
              ],
            },
          ],
        }),
      ]
    );

    await client.query(
      `INSERT INTO posts (title, description, tags, author, published, content) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        "Draft Post - Work in Progress",
        "This post is not yet published and is still being written.",
        ["Draft"],
        "David Václavík",
        false,
        JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "This post is not yet published and is still being written.",
                },
              ],
            },
          ],
        }),
      ]
    );

    // Post without tags
    await client.query(`INSERT INTO posts (title, description, content) VALUES ($1, $2, $3)`, [
      "Post without tags",
      "This post does not have any tags.",
      JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "This post does not have any tags." }],
          },
        ],
      }),
    ]);

    // Posts with tags array
    await client.query(
      `INSERT INTO posts (title, description, tags, content) VALUES ($1, $2, $3, $4)`,
      [
        "Resource Names for Enterprise TypeScript Monorepos",
        "Multi-service TypeScript applications have a naming problem.",
        ["TypeScript", "React"],
        JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: 'Multi-service TypeScript applications have a naming problem. Every service invents its own way to reference resources. One team builds paths with template literals, another passes loose IDs through function arguments, a third hardcodes service prefixes as magic strings. It works until someone joins the team and asks "how do I construct a resource path here?" and gets a different answer depending on which file they are looking at.',
                },
              ],
            },
          ],
        }),
      ]
    );

    // Post with Most of Tiptap features, for testing purposes
    await client.query(
      `INSERT INTO posts (title, description, tags, published, content) VALUES ($1, $2, $3, $4, $5)`,
      [
        "Tiptap Editor JSON Content Example",
        "Section 1: Headings Section 2: Bold, Italic, Underline, Strikethrough, Code Section 3: Colors Section 4: Lists Section 5: Links",
        ["Tiptap", "Editor", "JSON", "Example"],
        true,
        JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Section 1:",
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        color: null,
                      },
                    },
                  ],
                  text: "Heading 1",
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 3,
              },
              content: [
                {
                  type: "text",
                  text: "Heading 2",
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 3,
              },
              content: [
                {
                  type: "text",
                  text: "Heading 3",
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 4,
              },
              content: [
                {
                  type: "text",
                  text: "Heading 4",
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 5,
              },
              content: [
                {
                  type: "text",
                  text: "Heading 5",
                },
              ],
            },
            {
              type: "heading",
              attrs: {
                level: 6,
              },
              content: [
                {
                  type: "text",
                  text: "Heading 6",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Section 2:",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Bold text",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        color: null,
                      },
                    },
                    {
                      type: "italic",
                    },
                  ],
                  text: "Italic text",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        color: null,
                      },
                    },
                    {
                      type: "underline",
                    },
                  ],
                  text: "Underline text",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        color: null,
                      },
                    },
                    {
                      type: "strike",
                    },
                  ],
                  text: "Strikethrough text",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "Code inlinte text",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Section 3:",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Color not implemented yet",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        color: null,
                      },
                    },
                  ],
                  text: "Section 4:",
                },
              ],
            },
            {
              type: "orderedList",
              attrs: {
                start: 1,
                type: null,
              },
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "number one list item",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          marks: [
                            {
                              type: "textStyle",
                              attrs: {
                                color: null,
                              },
                            },
                          ],
                          text: "number two list item",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Bullet list item - one",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Bullet list item - two",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Section 5:",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/spellcheck",
                        target: "_blank",
                        rel: "noopener noreferrer nofollow",
                        class: "link",
                        title: null,
                      },
                    },
                  ],
                  text: "MDN spellcheck",
                },
              ],
            },
            {
              type: "paragraph",
            },
          ],
        }),
      ]
    );

    // Post with horizontalRule and blockquote
    await client.query(
      `INSERT INTO posts (title, description, tags, published, content) VALUES ($1, $2, $3, $4, $5)`,
      [
        "Tiptap Editor JSON Content Example 2",
        "normal text, horizontal rule, blockquote",
        ["Tiptap", "Editor", "JSON", "Example"],
        true,
        JSON.stringify({
          type: "doc",
          content: [
            { type: "paragraph", content: [{ type: "text", text: "normal text" }] },
            { type: "horizontalRule" },
            { type: "paragraph", content: [{ type: "text", text: "normal text" }] },
            {
              type: "blockquote",
              content: [
                { type: "paragraph", content: [{ type: "text", text: "Block quote" }] },
                { type: "paragraph", content: [{ type: "text", text: "also Blockquote" }] },
                { type: "paragraph", content: [{ type: "text", text: "also Blockquote" }] },
              ],
            },
            { type: "paragraph", content: [{ type: "text", text: "normal text" }] },
            { type: "paragraph" },
          ],
        }),
      ]
    );

    // Post with codeBlock
    await client.query(
      `INSERT INTO posts (title, description, tags, published, content) VALUES ($1, $2, $3, $4, $5)`,
      [
        "Tiptap Editor JSON Content Example 3",
        "code block example",
        ["Tiptap", "Editor", "JSON", "Example"],
        true,
        JSON.stringify({
          type: "doc",
          content: [
            {
              type: "codeBlock",
              attrs: { language: null },
              content: [
                {
                  type: "text",
                  text: 'async function getPost(id: string): Promise<Post> {\n  const res = await fetch(`http://localhost:3000/posts/${id}`);\n\n  if (res.status === 404) notFound();\n\n  if (!res.ok) {\n    throw new Error("Failed to fetch post");\n  }\n\n  return res.json();\n}',
                },
              ],
            },
          ],
        }),
      ]
    );

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

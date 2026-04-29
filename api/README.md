# CodeLog API

Express + PostgreSQL REST API for the CodeLog blog platform.

Runs on `http://localhost:3000` by default.

---

## 📁 Structure

```
src/
├── app.js              # Express app setup (middleware, routes)
├── server.js           # Entry point (starts the server)
├── controllers/        # Route handlers (HTTP layer)
├── services/           # Database query logic
├── middleware/         # authenticate.js — JWT cookie verification
├── routes/             # Route definitions
└── db/
    ├── pool.js         # PostgreSQL connection pool
    ├── schema.sql      # Table definitions
    └── seed.js         # Dev seed data
```

---

## ⚙️ Environment Variables

Create `api/.env`:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/codelog
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN_1=http://localhost:3001
CORS_ORIGIN_2=http://localhost:3002
```

---

## 🚀 Running

```bash
npm run dev
```

Uses `node --watch` for auto-restart on file changes.

---

## 🔗 Endpoints

### Auth — `/auth`

| Method | Path             | Auth | Description                |
| ------ | ---------------- | ---- | -------------------------- |
| POST   | `/auth/register` | —    | Register a new user        |
| POST   | `/auth/login`    | —    | Login, sets `token` cookie |
| POST   | `/auth/logout`   | —    | Clears `token` cookie      |
| GET    | `/auth/me`       | ✅   | Returns current user info  |

### Posts — `/posts`

| Method | Path                  | Auth | Description             |
| ------ | --------------------- | ---- | ----------------------- |
| GET    | `/posts`              | —    | Get all posts           |
| POST   | `/posts`              | ✅   | Create a new post       |
| GET    | `/posts/:id`          | —    | Get a single post       |
| GET    | `/posts/:id/comments` | —    | Get comments for a post |
| POST   | `/posts/:id/comments` | ✅   | Add a comment to a post |

### Dev only — `/seed`

| Method | Path    | Description                         |
| ------ | ------- | ----------------------------------- |
| POST   | `/seed` | Truncates and re-seeds the database |

> Only available when `NODE_ENV !== "production"`.

---

## 🔐 Authentication

Uses **JWT stored in an `httpOnly` cookie** (`token`). The `authenticate` middleware verifies the token and attaches `req.userId` and `req.isAdmin` to the request for downstream controllers.

Token payload:

```json
{ "sub": 1, "isAdmin": false }
```

---

## 🗄️ Database

Schema is at `src/db/schema.sql`. Run it against your PostgreSQL database to create the tables.

To seed development data, start the server and call:

```bash
curl -X POST http://localhost:3000/seed
```

This truncates all tables and inserts one admin, test users, posts, and comments.

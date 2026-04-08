# CodeLog

CodeLog is a **personal developer blog** where I share articles, tutorials, and insights about web development and modern developer technologies.

This is a **monorepo** containing:

- `api/` – Node.js + Express backend with PostgreSQL
- `client/` – Next.js frontend for users
- `admin/` – Next.js admin dashboard

---

## 🏗 Project Structure

```text
codelog/
├── api/       # Express API + PostgreSQL
├── client/    # Next.js frontend for users
├── admin/     # Next.js admin dashboard
├── node_modules/
├── package.json # Root package.json for monorepo management and workspaces
└── .gitignore
```

---

## ⚙️ Prerequisites

- Node.js v18+
- PostgreSQL

## 🚀 Getting Started

1. Install dependencies from the root:

```bash
npm install
```

2. Set up environment variables — create `api/.env`:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/codelog
```

3. Run all workspaces concurrently:

```bash
npm run dev
```

Or run individually:

```bash
npm run dev --workspace=api
npm run dev --workspace=client
npm run dev --workspace=admin
```

## 🌐 Ports

| Service | URL                   | Change port in        |
| ------- | --------------------- | --------------------- |
| API     | http://localhost:3000 | `api/.env` → `PORT`   |
| Client  | http://localhost:3001 | `client/package.json` |
| Admin   | http://localhost:3002 | `admin/package.json`  |

## 🗄️ Database Schema

Schema is located at `api/src/db/schema.sql`. Run it against your PostgreSQL database to set up the tables.

| Table      | Description                        |
| ---------- | ---------------------------------- |
| `posts`    | Blog posts with tags and author    |
| `comments` | Comments linked to posts and users |
| `users`    | User accounts                      |

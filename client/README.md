# CodeLog Client

Next.js frontend for the CodeLog developer blog platform.

Runs on `http://localhost:3001` by default.

---

## 📁 Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, Header, global styles
│   ├── page.tsx                # Home page — renders PostList
│   ├── auth/
│   │   ├── login/page.tsx      # Login form
│   │   ├── logout/page.tsx     # Logout action + redirect
│   │   └── register/page.tsx   # Register form
│   └── posts/
│       ├── page.tsx            # All posts listing
│       └── [id]/page.tsx       # Single post with comments
├── components/
│   ├── header.tsx              # Server component — reads auth cookie, shows user
│   ├── post-list.tsx           # Post cards listing
│   └── comments.tsx            # Comment display + submission form (client)
└── lib/
    └── types.ts                # Shared TypeScript types (Post, Comment, User)
```

---

## ⚙️ Environment

The client expects the API to be running at `http://localhost:3000`. No `.env` file is required for local development — the API URL is hardcoded for dev.

---

## 🚀 Running

```bash
npm run dev --workspace=client
```

Or from inside the `client` folder:

```bash
npm run dev
```

---

## 🔗 Pages

| Route            | Description                          |
| ---------------- | ------------------------------------ |
| `/`              | Home — lists all published posts     |
| `/posts`         | Full post listing                    |
| `/posts/:id`     | Single post with comments            |
| `/auth/register` | Registration form                    |
| `/auth/login`    | Login form                           |
| `/auth/logout`   | Clears session and redirects to home |

---

## 🔐 Authentication

Auth is cookie-based — the API sets an `httpOnly` JWT cookie on login/register. The client:

- Sends `credentials: "include"` on all authenticated fetch calls
- Reads the cookie server-side in `header.tsx` via `next/headers` to show the logged-in user
- Calls `router.refresh()` after login/logout to re-render server components

---

## 🧱 Tech

| Tool         | Version | Notes                         |
| ------------ | ------- | ----------------------------- |
| Next.js      | 16.2.2  | App Router, server components |
| React        | 19.2.4  | React Compiler enabled        |
| Tailwind CSS | v4      | PostCSS plugin                |
| TypeScript   | ^5      | Strict mode                   |

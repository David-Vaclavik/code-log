import { JSONContent } from "@tiptap/core";

// Used in: components/post-list.tsx, app/posts/[id]/page.tsx
export type Post = {
  id: number;
  title: string;
  content: string;
  content_json: JSONContent;
  tags: string[] | null;
  author: string;
  published: boolean;
  created_at: Date;
  updated_at: Date | null;
};

// Used in: components/comments.tsx
export type Comment = {
  id: number;
  content: string;
  user_name: string;
  user_id: number;
  post_id: number;
  created_at: Date;
  updated_at: Date | null;
};

// Used in header.tsx, setup in auth/me endpoint
export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

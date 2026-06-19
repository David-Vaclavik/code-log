import { JSONContent } from "@tiptap/core";

// Used in: app/posts/[id]/page.tsx, components/draft-list.tsx, components/edit-post.tsx
export type Post = {
  id: number;
  title: string;
  description: string;
  content: JSONContent;
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

// Used in components/draft-list.tsx, app/lib/actions.ts
export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    offset: number;
    limit: number;
    hasMore: boolean;
  };
}

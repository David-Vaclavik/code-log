// Used in: components/post-list.tsx, app/posts/[id]/page.tsx
export type Post = {
  id: number;
  title: string;
  content: string;
  tags: string[] | null;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string | null;
};

// Used in: components/comments.tsx
export type Comment = {
  id: number;
  content: string;
  user_name: string;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string | null;
};

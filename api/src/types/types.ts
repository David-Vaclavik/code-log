// Used in: src\services\postsService.ts - insertPost, updatePost
export type JSONContent = {
  type?: string;
  attrs?: Record<string, any> | undefined;
  content?: JSONContent[];
  marks?: { type: string; attrs?: Record<string, any>; [key: string]: any }[];
  text?: string;
  [key: string]: any;
};

// Used in: src\controllers\postsController.ts - getPosts, createPost, getPost, editPost
// Used in: src\services\postsService.ts - getAllPosts, insertPost, getPostById, updatePost
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

//TODO: implement types for comments and users as well
// Used in:
export type Comment = {
  id: number;
  content: string;
  user_name: string;
  user_id: number;
  post_id: number;
  created_at: Date;
  updated_at: Date | null;
};

// Used in:
export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

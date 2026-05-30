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

//TODO: implement types for comments
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

// Reflects the database structure, including password_hash and timestamps
// Used in: src\services\authService.ts - findUserByEmail
// Used in: src\controllers\authController.ts - register, login
export type UserRow = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  password_hash: string;
  created_at: Date;
  updated_at: Date | null;
};

// Excludes sensitive fields, safe to pass to client
// Used in: src\services\authService.ts - createUser, findUserById
// Used in: src\controllers\authController.ts - register, getUser
export type User = Omit<UserRow, "password_hash" | "updated_at" | "created_at">;

/* This is what's in the FE, we just changed is_admin to isAdmin in the controller response
export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};
*/

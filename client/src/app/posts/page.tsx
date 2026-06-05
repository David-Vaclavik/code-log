import PostList from "@/components/post-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  return (
    <>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-16 sm:items-start">
        <h1>Posts</h1>
        <PostList />
      </main>
    </>
  );
}

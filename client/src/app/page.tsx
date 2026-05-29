import PostList from "@/components/post-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-16 sm:items-start">
        <PostList />
      </main>
    </>
  );
}

import { PostForm } from "@/components/edit-post";
import { Post } from "@/lib/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Draft",
};

export default async function DraftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="flex flex-col gap-8">
      <h1>Edit draft</h1>

      <PostForm post={post} />
    </div>
  );
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`http://localhost:3000/posts/${id}`);

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

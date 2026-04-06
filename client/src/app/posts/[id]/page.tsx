import { Post } from "@/components/post-list";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-4 sm:items-start">
      {post.tags && <p className="text-sm text-zinc-500">Tags: {post.tags}</p>}
      <h1 className="text-5xl text-zinc-200">{post.title}</h1>
      <p className="text-sm text-zinc-500 mb-8">{new Date(post.created_at).toLocaleDateString()}</p>

      {/* content */}
      <p className="text-base text-zinc-400 leading-relaxed">{post.content}</p>
    </main>
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

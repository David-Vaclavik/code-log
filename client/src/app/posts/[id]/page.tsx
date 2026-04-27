import Comments from "@/components/comments";
import { Post } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  const comments = await getComments(id);

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-16 sm:items-start">
      <div className="w-full flex flex-col gap-4">
        {post.tags && <p className="text-sm text-zinc-500">Tags: {post.tags.join(", ")}</p>}
        <h1 className="text-5xl text-zinc-200">{post.title}</h1>
        <p className="text-base text-zinc-500">By {post.author}</p>
        <p className="text-sm text-zinc-500 mb-8">
          {new Date(post.created_at).toLocaleDateString("cs-CZ")}
        </p>

        {/* content */}
        <p className="text-base text-zinc-350 leading-relaxed">{post.content}</p>
      </div>

      {/* comments */}
      <Comments postId={id} initialComments={comments} />
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

async function getComments(postId: string) {
  const res = await fetch(`http://localhost:3000/posts/${postId}/comments`);

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
}

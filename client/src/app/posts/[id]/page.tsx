import Comments from "@/components/comments";
import { TiptapExtensionsRenderer } from "@/components/tiptap-render";
import { Comment, Post } from "@/lib/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Post ${id}`,
  };
}

export default async function PostPage({ params }: Params) {
  const { id } = await params;
  const post = await getPost(id);
  const comments = await getComments(id);

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-16">
      <div className="w-full flex flex-col gap-4">
        {post.tags && <p className="text-sm text-neutral-500">Tags: {post.tags.join(", ")}</p>}
        <h1 className="text-5xl text-neutral-100">{post.title}</h1>
        {/* <p className="text-base text-neutral-500">By {post.author}</p> */}
        <p className="text-sm text-neutral-500 mb-8">
          Created: {new Date(post.created_at).toLocaleDateString("cs-CZ")}
          {post.updated_at
            ? ` - Updated: ${new Date(post.updated_at).toLocaleDateString("cs-CZ")}`
            : ""}
        </p>

        {/* Below is for content_json, using TiptapRenderer - renderToReactElement  */}
        <TiptapExtensionsRenderer content={post.content} />
      </div>

      {/* comments */}
      <Comments postId={id} initialComments={comments} />
    </main>
  );
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`http://localhost:3000/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error(`Failed to fetch posts (${res.status})`);
  }

  return res.json();
}

async function getComments(postId: string): Promise<Comment[]> {
  const res = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch comments (${res.status})`);
  }

  return res.json();
}

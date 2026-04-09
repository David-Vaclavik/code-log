import Link from "next/link";
import { Post } from "@/lib/types";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="w-full flex flex-col gap-8">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="flex flex-col hover:bg-zinc-900 p-4 rounded-lg transition-colors"
        >
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          {post.tags && <p className="text-sm text-zinc-500">Tags: {post.tags.join(", ")}</p>}

          <p className="text-base text-zinc-350 mt-2 line-clamp-3">{post.content}</p>
          <p className="text-sm text-zinc-500">{new Date(post.created_at).toLocaleDateString()}</p>
        </Link>
      ))}
    </div>
  );
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/posts");
  return res.json();
}

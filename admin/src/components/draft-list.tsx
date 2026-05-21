import Link from "next/link";
import { Post } from "@/lib/types";

export default async function DraftList() {
  const posts = await getPosts();

  return (
    <div className="w-full flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/draft/${post.id}`}
          className="grid grid-cols-[minmax(200px,1fr)_80px_200px_100px] gap-4 items-center hover:bg-zinc-900 px-8 py-4  rounded-lg transition-colors"
        >
          <h2 className="text-2xl font-semibold truncate">{post.title}</h2>

          <p className="text-base text-zinc-mid">{post.published ? "Published" : "Draft"}</p>
          <p className="text-sm text-zinc-500 truncate">Tags: {post.tags?.join(", ")}</p>
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

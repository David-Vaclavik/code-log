import Link from "next/link";
import { Post } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function DraftList() {
  const posts = await getPosts();

  return (
    <div className="w-full flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/draft/${post.id}`}
          className="grid grid-cols-[minmax(200px,1fr)_80px_200px_100px] gap-4 items-center hover:bg-neutral-900 px-8 py-4  rounded-lg transition-colors"
        >
          <h2 className="text-2xl font-semibold truncate">{post.title}</h2>

          <p className="text-base text-zinc-mid">{post.published ? "Published" : "Draft"}</p>
          <p className="text-sm text-neutral-500 truncate">Tags: {post.tags?.join(", ")}</p>
          <p className="text-sm text-neutral-500">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.API_URL}/posts`);

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

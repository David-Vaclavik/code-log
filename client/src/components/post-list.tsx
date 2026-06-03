import Link from "next/link";
import { Post } from "@/lib/types";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="w-full flex flex-col pb-8 divide-y divide-solid ">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="flex flex-col p-6 hover:bg-neutral-hover transition-colors"
        >
          <h2>{post.title}</h2>

          {/* {post.tags && <p className="text-sm text-neutral-500">Tags: {post.tags.join(", ")}</p>} */}

          <p className="text-base text-neutral-350 mt-2 line-clamp-3">{post.description}</p>

          <p className="text-sm text-neutral-500 mt-3">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/posts");
  return res.json();
}

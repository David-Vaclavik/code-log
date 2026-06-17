"use client";

import Link from "next/link";
import type { PaginatedResult, Post } from "@/lib/types";
import { useState } from "react";
import { fetchPosts } from "@/lib/actions";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PageProps {
  posts: PaginatedResult<Post>;
}

const LIMIT = 10;

export default function DraftList({ posts: initialPosts }: PageProps) {
  const [postsState, setPosts] = useState(initialPosts);
  const [offset, setOffset] = useState(LIMIT); // Next offset after initial fetch
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = postsState.meta.hasMore;

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const newPosts = await fetchPosts(offset, LIMIT);
      // throw new Error("Failed to fetch posts"); // for testing error handling

      setPosts((prev) => ({
        ...prev,
        data: [...prev.data, ...newPosts.data],
        meta: newPosts.meta,
      }));
      setOffset((prev) => prev + LIMIT);
    } catch (error) {
      console.error("Failed to load more posts:", error);
      toast.error("Failed to load more drafts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!postsState || postsState.data.length === 0) {
    return <p>No drafts found.</p>;
  }

  return (
    <div className="w-full flex flex-col">
      {postsState.data.map((post) => (
        <Link
          key={post.id}
          href={`/draft/${post.id}`}
          className="grid grid-cols-[minmax(200px,1fr)_80px_200px_100px] gap-4 items-center hover:bg-neutral-900 px-8 py-4  rounded-lg transition-colors"
        >
          <h2 className="text-2xl font-semibold truncate">{post.title}</h2>

          <p className="text-base text-zinc-mid">
            {post.published ? "Published" : "Draft"} ID: {post.id}
          </p>
          <p className="text-sm text-neutral-500 truncate">Tags: {post.tags?.join(", ")}</p>
          <p className="text-sm text-neutral-500">
            {/* {new Date(post.created_at).toLocaleDateString()} */}
            {new Date(post.created_at).toLocaleDateString("en-GB")}
          </p>
        </Link>
      ))}

      <p className="text-sm text-neutral-500 self-center mt-4">
        Showing {postsState.data.length} of {postsState.meta.total} drafts
      </p>

      <Button
        onClick={handleLoadMore}
        variant="outline"
        disabled={isLoading || !hasMore}
        className="self-center mt-6 px-6"
        size="lg"
      >
        {/* {isLoading ? "Loading..." : "Load More"} */}
        {isLoading ? "Loading..." : hasMore ? "Load More" : "No More Drafts"}
      </Button>
    </div>
  );
}

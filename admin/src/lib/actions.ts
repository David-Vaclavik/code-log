"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PaginatedResult, Post } from "@/lib/types";

export async function redirectAfterAuth(path = "/", type: "layout" | "page" = "layout") {
  // Purge the cache for the entire layout
  revalidatePath(path, type);
  redirect(path);
  // any code after redirect will not be executed!
}

// Default values used for initial fetch in DraftsPage
export async function fetchPosts(
  offset: number = 0,
  limit: number = 10
): Promise<PaginatedResult<Post>> {
  const res = await fetch(`${process.env.API_URL}/posts?offset=${offset}&limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

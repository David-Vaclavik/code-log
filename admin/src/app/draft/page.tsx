import DraftList from "@/components/draft-list";
import { fetchPosts } from "@/lib/actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drafts",
};

export default async function DraftsPage() {
  const posts = await fetchPosts();

  return (
    <div className="flex flex-col gap-8">
      <h1>Drafts Page</h1>

      {/* add posts list */}
      <DraftList posts={posts} />
    </div>
  );
}

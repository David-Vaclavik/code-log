import { PostForm } from "@/components/edit-post";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Draft New Post",
};

export default function DraftNewPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1>Draft New Post Page</h1>

      <PostForm post={null} />
    </div>
  );
}

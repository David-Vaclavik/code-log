import EditPostForm from "@/components/edit-post";
// import PostEditor from "@/components/editor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Draft New Post",
};

export default function DraftNewPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1>Draft New Post Page</h1>
      {/* <CreatePostForms /> */}
      {/* <DraftList /> */}

      {/* add posts list */}
      {/* <PostEditor /> */}
      <EditPostForm post={null} />
    </div>
  );
}

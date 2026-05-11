import PostEditor from "@/components/editor";

export default function DraftNewPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1>Draft New Post Page</h1>
      {/* <CreatePostForm /> */}
      {/* <DraftList /> */}

      {/* add posts list */}
      <PostEditor />
    </div>
  );
}

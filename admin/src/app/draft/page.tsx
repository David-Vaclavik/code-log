import CreatePostForm from "@/components/create-post-form";
import DraftList from "@/components/draft-list";

export default function DraftsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1>Drafts Page</h1>
      <CreatePostForm />

      {/* add posts list */}
      <DraftList />
    </div>
  );
}

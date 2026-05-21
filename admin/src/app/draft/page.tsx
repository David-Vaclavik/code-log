import DraftList from "@/components/draft-list";

export default function DraftsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1>Drafts Page</h1>

      {/* add posts list */}
      <DraftList />
    </div>
  );
}

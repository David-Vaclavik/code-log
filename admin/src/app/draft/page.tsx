import DraftList from "@/components/draft-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drafts",
};

export default function DraftsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1>Drafts Page</h1>

      {/* add posts list */}
      <DraftList />
    </div>
  );
}

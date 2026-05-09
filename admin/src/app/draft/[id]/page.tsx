import CreatePostForm from "@/components/create-post-form";

// export default async function DraftPage({ params }: { params: Promise<{ id: string }> }) {
export default function DraftPage() {
  // const { id } = await params;
  // console.log("page id: ", id);

  return (
    <div className="flex flex-col gap-8">
      <h1>Drafts Page</h1>

      <h2>Edit draft</h2>

      {/* TODO: CreatePostForm should be replaced with a form that fetches and updates the draft - PUT */}
      <CreatePostForm />
    </div>
  );
}

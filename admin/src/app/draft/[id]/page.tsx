import EditPostForm from "@/components/edit-post";
import { Post } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function DraftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  // console.log("Post: ", post);

  return (
    <div className="flex flex-col gap-8">
      <h1>Edit draft</h1>

      <EditPostForm post={post} />
    </div>
  );
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`http://localhost:3000/posts/${id}`);

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

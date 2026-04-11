"use client";

import { Comment } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    // setLoading(true);

    const load = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${postId}/comments`);
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

        const data = await res.json();

        if (ignore) return;

        setComments(data);
        setLoading(false);
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load comments");
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [postId]);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    //! For testing purposes we will use a hardcoded user ID,
    // but in a real app this would come from the auth context
    const fakeUserId = 1;

    try {
      const res = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, user_id: fakeUserId }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      setContent("");
      setError(null);

      const updated = await fetch(`http://localhost:3000/posts/${postId}/comments`);
      setComments(await updated.json());
    } catch {
      setError("Failed to post comment. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-medium text-zinc-200">Comments</h2>

      {/* comment input */}
      {/* TODO: for testing there is no need to be logged in, will change later */}
      <div className="flex flex-col gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full bg-zinc-950 text-zinc-300 placeholder-zinc-500 border border-zinc-800 rounded-lg p-4 text-base resize-none overflow-hidden focus:outline-none focus:border-zinc-600"
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
          }}
        />
        <button
          onClick={handleSubmit}
          className="self-end w-32 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 px-4 py-2 rounded-md transition-colors"
        >
          Comment
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {loading && <p className="text-zinc-500">Loading comments...</p>}

      {!loading && comments.length === 0 && <p className="text-zinc-500">No comments yet.</p>}

      <ul className="flex flex-col gap-6">
        {comments.map((comment) => (
          <li key={comment.id}>
            <p className="text-sm text-zinc-500">
              By {comment.user_name} on {new Date(comment.created_at).toLocaleDateString("cs-CZ")}
            </p>
            <p className="text-base text-zinc-300 leading-relaxed">{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

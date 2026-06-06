"use client";

import { Comment } from "@/lib/types";
import { useState } from "react";

export default function Comments({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      const res = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        setError("Failed to post comment. Please try again.");
        // throw new Error("Failed to post comment");
      }

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
      <h2 className="text-2xl font-medium text-neutral-200">Comments</h2>

      {/* comment input */}
      {/* TODO: for testing there is no need to be logged in, will change later */}
      <div className="flex flex-col gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full bg-neutral-950 text-neutral-300 placeholder-neutral-500 border border-neutral-800 rounded-lg p-4 text-base resize-none overflow-hidden focus:outline-none focus:border-neutral-700"
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          onClick={handleSubmit}
          className="self-end w-32 bg-input/30 text-primary/90 font-[550] px-4 py-2 rounded-md border border-input/80 hover:bg-input/50 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:bg-primary/50"
        >
          Comment
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {/* {loading && <p className="text-neutral-500">Loading comments...</p>} */}

      {comments.length === 0 && <p className="text-neutral-500">No comments yet.</p>}

      <ul className="flex flex-col gap-6">
        {comments.map((comment) => (
          <li key={comment.id}>
            <p className="text-sm text-neutral-500">
              By {comment.user_name} on {new Date(comment.created_at).toLocaleDateString("cs-CZ")}
            </p>
            <p className="text-base text-neutral-300 leading-relaxed">{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

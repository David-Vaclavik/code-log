"use client";

import { useState } from "react";
import { Content, generateHTML } from "@tiptap/react";
import { MinimalTiptapEditor } from "./ui/minimal-tiptap";
import { Button } from "./ui/button";
import { createExtensions } from "./ui/minimal-tiptap/hooks/use-minimal-tiptap";
import { Post } from "@/lib/types";
import { redirectAfterAuth } from "@/lib/actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const jsonExample = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          text: "Testing setting content with JSON",
          type: "text",
        },
      ],
    },
  ],
};

export default function EditPostForm({ post }: { post: Post | null }) {
  const [editorKey, setEditorKey] = useState(0);
  // If post is null, we initialize all fields with an empty string, otherwise we use the post content
  const [content, setContent] = useState<Content>(post?.content ?? "");
  const [form, setForm] = useState({
    title: post?.title ?? "",
    tags: post?.tags?.join(", ") ?? "",
    description: post?.description ?? "",
  });

  const handleConsoleLog = () => {
    console.log(content);
  };

  const handleSetContent = () => {
    setContent(jsonExample);
    setEditorKey((prev) => prev + 1);
  };

  const handleGenerate = () => {
    if (!content) {
      console.log("Content empty");
      return;
    }

    try {
      if (typeof content === "string") {
        console.log("Content is a string, cannot generate HTML");
        return;
      }

      const html = generateHTML(content, createExtensions({ placeholder: "", output: "json" }));
      console.log("HTML: ", html);
    } catch (error) {
      console.error("Failed to generate HTML from post content:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(form);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Raw Form: ", form);

    // For now tags must be a comma separated string
    const payloadForm = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : null,
      content: content,
    };

    console.log("Formatted Form: ", payloadForm);

    //TODO: Move the fetch logic to a server action if you want to keep the API URL private (not exposed to the browser).
    //? or pass it as a prop?
    const url = post
      ? `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/posts`;
    // console.log(url);
    const methodFinal = post ? "PUT" : "POST";

    const res = await fetch(url, {
      method: methodFinal,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payloadForm),
    });

    const data = await res.json();
    console.log("Data: ", data);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    toast.success(`Post ${post ? "updated" : "created"} successfully!`);
    if (!post) {
      redirectAfterAuth("/draft", "page");
    }
  };

  return (
    <div className="flex flex-col max-w-3xl-editor gap-4">
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input placeholder="Title" name="title" value={form.title} onChange={handleChange} />
        <Input placeholder="Tags" name="tags" value={form.tags} onChange={handleChange} />

        <Textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <MinimalTiptapEditor
          key={editorKey}
          value={content}
          onChange={setContent}
          className="min-h-120 w-full"
          editorContentClassName="p-5 flex flex-1"
          output="json"
          placeholder="Write your post..."
          autofocus={true}
          editable={true}
          editorClassName="focus:outline-none flex-1"
        />

        <Button type="submit">Submit</Button>
      </form>

      {/* Buttons below for testing only */}
      <Button onClick={handleConsoleLog} variant="outline">
        Console log content
      </Button>
      <Button onClick={handleSetContent} variant="outline">
        Set content
      </Button>
      <Button onClick={handleGenerate} variant="outline">
        Generate HTML
      </Button>
    </div>
  );
}

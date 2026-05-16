"use client";

import { useState } from "react";
import { Content, generateHTML } from "@tiptap/react";
import { MinimalTiptapEditor } from "./ui/minimal-tiptap";
import { Button } from "./ui/button";
import { createExtensions } from "./ui/minimal-tiptap/hooks/use-minimal-tiptap";
// import { usePathname, useRouter } from "next/navigation";

export default function PostEditor() {
  // const router = useRouter();
  // const pathname = usePathname();

  const [content, setContent] = useState<Content>("");
  const [form, setForm] = useState({
    title: "",
    tags: "",
  });

  const handleConsoleLog = () => {
    console.log(content);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(form);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Raw Form: ", form);

    // TypeScript, React - for now tags must be a comma separated string
    const payloadForm = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : null,
      content: "This should be description in the future",
      content_json: content,
    };

    console.log("Formatted Form: ", payloadForm);

    const res = await fetch(`http://localhost:3000/posts`, {
      method: "POST",
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

    /*
    //? Maybe pass id as a prop from parent page.tsx, instead of pathname
    const draftId = pathname.split("/").pop(); // get the last part of the url
    if (draftId) {
      router.push(`/draft`);
    } else {
      router.refresh();
    }
      */
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>Create post form</h2>

      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Title"
          name="title"
          onChange={handleChange}
          className=" bg-zinc-600 py-1.5 px-3"
        />
        <input
          placeholder="Tags"
          name="tags"
          onChange={handleChange}
          className=" bg-zinc-600 py-1.5 px-3"
        />

        <button type="submit" className="bg-zinc-800">
          Submit
        </button>
      </form>

      <MinimalTiptapEditor
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

      <Button onClick={handleConsoleLog} variant="outline">
        Console log content
      </Button>
      <Button onClick={handleGenerate} variant="default">
        Generate HTML
      </Button>
    </div>
  );
}

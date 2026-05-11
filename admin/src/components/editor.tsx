"use client";

import { useState } from "react";
import { Content } from "@tiptap/react";
// import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { MinimalTiptapEditor } from "./ui/minimal-tiptap";
import { Button } from "./ui/button";

export default function PostEditor() {
  const [value, setValue] = useState<Content>("");

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <MinimalTiptapEditor
        value={value}
        onChange={setValue}
        className="min-h-120 w-full"
        editorContentClassName="p-5"
        output="text"
        placeholder="Write your post..."
        autofocus={true}
        editable={true}
        editorClassName="focus:outline-none"
      />

      <button onClick={handleSubmit}>Submit</button>

      <Button onClick={handleSubmit} variant="outline">
        Submit
      </Button>
    </div>
  );
}

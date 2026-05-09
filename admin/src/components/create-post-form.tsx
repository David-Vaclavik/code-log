"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePostForm() {
  const router = useRouter();
  const pathname = usePathname();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  // For now this is what we should send to the backend:
  // {
  //   "title": "Protected Route POST Logged in again",
  //   "content": "This route is now protected",
  //   "tags": ["TypeScript", "React"]
  // }

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

    // TypeScript, React - for now tags must be a comma separated string
    const payloadForm = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : null,
    };

    console.log("Formatted Form: ", payloadForm);

    const res = await fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payloadForm),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    //? Maybe pass id as a prop from parent page.tsx, instead of pathname
    const draftId = pathname.split("/").pop(); // get the last part of the url
    if (draftId) {
      router.push(`/draft`);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-8">
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
        <textarea
          placeholder="Content"
          name="content"
          onChange={handleChange}
          className=" bg-zinc-600 py-1.5 px-3"
        ></textarea>
        <button type="submit" className="bg-zinc-800">
          Submit
        </button>
      </form>
    </div>
  );
}

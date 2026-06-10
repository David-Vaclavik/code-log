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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(255, "Title must be at most 255 characters."),
  tags: z.string().max(255, "Tags must be at most 255 characters.").optional(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(350, "Description must be at most 350 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export function PostForm({ post }: { post: Post | null }) {
  // If post is null, we initialize all fields with an empty string, otherwise we use the post fields
  const [content, setContent] = useState<Content>(post?.content ?? "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title ?? "",
      tags: post?.tags?.join(", ") ?? "",
      description: post?.description ?? "",
    },
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
      toast.error("Failed to generate HTML from post content: " + error);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!content) {
      toast.error("Post content is required");
      return;
    }

    try {
      // For now tags must be a comma separated string
      const payloadForm = {
        ...data,
        tags: data.tags
          ? data.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : null,
        content: content,
      };

      console.log("Formatted Form: ", payloadForm);

      //TODO: Move the fetch logic to a server action if you want to keep the API URL private (not exposed to the browser).
      const url = post
        ? `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/posts`;

      const res = await fetch(url, {
        method: post ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payloadForm),
      });

      const result = await res.json();
      console.log("Data: ", result);

      if (!res.ok) {
        toast.error(result.error || `Failed to ${post ? "update" : "create"} post`);
        return;
      }

      toast.success(`Post ${post ? "updated" : "created"} successfully!`);
      if (!post) {
        redirectAfterAuth("/draft", "page");
      }
    } catch (error) {
      toast.error("An unexpected error occurred: " + error);
    }
  };

  return (
    <div className="flex flex-col max-w-3xl-editor gap-4">
      <form id="post-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="post-form-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="post-form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="post-form-tags">Tags</FieldLabel>
                <Input
                  {...field}
                  id="post-form-tags"
                  aria-invalid={fieldState.invalid}
                  placeholder="React, Mobile, Bug"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="post-form-description">Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="post-form-description"
                    placeholder="I'm having an issue with the login button on mobile."
                    rows={6}
                    className="min-h-24 resize-none text-base!"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/350 characters
                    </InputGroupText>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />
        </FieldGroup>

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

        <Field orientation={"horizontal"}>
          <Button
            type="button"
            variant="outline"
            disabled={form.formState.isSubmitting}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="post-form"
            disabled={form.formState.isSubmitting}
            className="grow"
          >
            {form.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
            Submit
          </Button>
        </Field>
      </form>

      {/* Buttons below for testing only */}
      <Button onClick={handleConsoleLog} variant="outline">
        Console log content
      </Button>
      <Button onClick={handleGenerate} variant="outline">
        Generate HTML
      </Button>
    </div>
  );
}

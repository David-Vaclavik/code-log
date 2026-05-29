"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useState } from "react";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(32, "Name must be at most 32 characters."),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(255, "Email must be at most 255 characters.")
      .pipe(z.email("Invalid email address")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password must be at most 64 characters."),
    confirmPassword: z.string(),
  })
  //? I don't like refine approach, superRefine has better readability
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: "Passwords don't match",
  //   path: ["confirmPassword"],
  // });
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

type FormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await fetch(`http://localhost:3000/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          form.setError("email", { type: "manual", message: result.error });
        } else {
          // toast.error(result.error || "Failed to register");
          console.error(result.error || "Failed to register");
        }

        return;
      }

      // toastPrint(data, "success");
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Failed to register, catch:", error);
      // toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-card p-6 border border-border rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-1">
          <h3>Create an account</h3>
          <p className="text-muted-foreground">Fill in the form to create a new account.</p>
        </div>

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="register-form-name"
                className={`w-fit leading-snug ${fieldState.invalid ? "text-destructive" : ""}`}
              >
                Name
              </label>
              <input
                {...field}
                id="register-form-name"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your name"
                autoComplete="off"
                className={`bg-input/30 border rounded-md py-1.5 px-3 placeholder:font-light focus:outline-none ${
                  fieldState.invalid
                    ? "text-destructive/90 border-destructive/50 ring-3 ring-destructive/40 placeholder:text-destructive/70 focus"
                    : "border-input focus:border-ring focus:ring-3 focus:ring-ring/50"
                }`}
              />

              {fieldState.error && (
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="register-form-email"
                className={`w-fit leading-snug ${fieldState.invalid ? "text-destructive" : ""}`}
              >
                Email
              </label>
              <input
                {...field}
                id="register-form-email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="email"
                className={`bg-input/30 border rounded-md py-1.5 px-3 placeholder:font-light focus:outline-none ${
                  fieldState.invalid
                    ? "text-destructive/90 border-destructive/50 ring-3 ring-destructive/40 placeholder:text-destructive/70"
                    : "border-input focus:border-ring focus:ring-3 focus:ring-ring/50"
                }`}
              />
              {fieldState.error && (
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="register-form-password"
                className={`w-fit leading-snug ${fieldState.invalid ? "text-destructive" : ""}`}
              >
                Password
              </label>
              <input
                {...field}
                id="register-form-password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="new-password"
                className={`bg-input/30 border rounded-md py-1.5 px-3 placeholder:font-light focus:outline-none ${
                  fieldState.invalid
                    ? "text-destructive/90 border-destructive/50 ring-3 ring-destructive/40 placeholder:text-destructive/70"
                    : "border-input focus:border-ring focus:ring-3 focus:ring-ring/50"
                }`}
              />
              {fieldState.error && (
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="register-form-confirm-password"
                className={`w-fit leading-snug ${fieldState.invalid ? "text-destructive" : ""}`}
              >
                Confirm Password
              </label>
              <input
                {...field}
                id="register-form-confirm-password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className={`bg-input/30 border rounded-md py-1.5 px-3 placeholder:font-light focus:outline-none ${
                  fieldState.invalid
                    ? "text-destructive/90 border-destructive/50 ring-3 ring-destructive/40 placeholder:text-destructive/70"
                    : "border-input focus:border-ring focus:ring-3 focus:ring-ring/50"
                }`}
              />
              {fieldState.error && (
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          className="bg-primary text-primary-foreground font-[550] py-1.5 px-4 rounded-md hover:bg-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/70"
        >
          Submit
        </button>

        <div className="mt-4 text-center text-sm font-normal text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-card-foreground no-underline! hover:underline!"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

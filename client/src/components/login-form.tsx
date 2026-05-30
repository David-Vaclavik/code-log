"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { redirectAfterAuth } from "@/lib/actions";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
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
});

type FormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsPending(true);
    const formData = {
      email: data.email,
      password: data.password,
    };

    await new Promise((resolve) => setTimeout(resolve, 100000));

    try {
      const res = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setIsPending(false);

        if (res.status === 404) {
          form.setError("email", { type: "manual", message: result.error });
        } else if (res.status === 401) {
          form.setError("password", { type: "manual", message: "Wrong password" });
        } else {
          // toast.error(result.error || "Failed to log in");
          console.error(result.error || "Failed to log in");
        }

        return;
      }
    } catch (error) {
      setIsPending(false);
      console.error("Failed to login, catch:", error);
      // toast.error("An unexpected error occurred. Please try again.");
      return;
    }

    // On successful login, we need to revalidate the layout to update the header and redirect to the homepage
    await redirectAfterAuth();
  };

  return (
    <div className="flex flex-col">
      <form
        id="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-card p-6 border border-border rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-1">
          <h3>Log in to your account</h3>
          <p className="text-muted-foreground">Fill in the form to log in to your account.</p>
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="login-form-email"
                className={`w-fit leading-snug ${fieldState.invalid ? "text-destructive" : ""}`}
              >
                Email
              </label>
              <input
                {...field}
                id="login-form-email"
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
                htmlFor="login-form-password"
                className={`w-fit leading-snug ${fieldState.invalid ? "text-destructive" : ""}`}
              >
                Password
              </label>
              <input
                {...field}
                id="login-form-password"
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

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-[550] py-1.5 px-4 rounded-md hover:bg-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:bg-primary/50"
        >
          {isPending && <LoaderCircle className="animate-spin" />}
          Submit
        </button>

        <div className="mt-4 text-center text-sm font-normal text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-card-foreground no-underline! hover:underline!"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

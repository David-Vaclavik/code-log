"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = (data: z.infer<typeof loginSchema>) => {
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //! for testing, payload should not be visible in real app
    toastPrint(data, "payload");

    const formData = {
      email: data.email,
      password: data.password,
    };
    // zybyhinuf@mailinator.com
    // Pa$$w0rd!

    try {
      const res = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      // TODO: set base styles to toaster in layout
      if (!res.ok) {
        if (res.status === 404) {
          form.setError("email", { type: "manual", message: result.error });
        } else if (res.status === 401) {
          form.setError("password", { type: "manual", message: "Wrong password" });
        } else {
          toast.error(result.error || "Failed to log in");
        }

        return;
      }

      toastPrint(data, "success");
      router.push("/");
    } catch (error) {
      console.error("Failed to log in, catch:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Fill in the form to log in to your account.</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="login-form-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-form-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="login-form-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field>
            {/* //! Will delete RESET button later */}
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button
              type="submit"
              form="login-form"
              disabled={form.formState.isSubmitting}
              className="grow"
            >
              {form.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
              Sign In
            </Button>

            <FieldDescription className="mt-8! text-center text-sm font-normal text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-card-foreground no-underline! hover:underline!"
              >
                Create an account
              </Link>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

function toastPrint(data: FormValues, type: string = "default") {
  switch (type) {
    case "success":
      toast("Login successful!", {
        description: "You have logged in successfully.",
        position: "bottom-right",
        // duration: Infinity,
        classNames: {
          content: "flex flex-col gap-2",
          description: "text-green-300!",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
          "--normal-bg": "var(--color-green-900)",
          "--normal-border": "var(--color-green-700)",
          "--normal-text": "var(--color-green-100)",
          width: "fit-content",
          maxWidth: "90vw",
        } as React.CSSProperties,
      });
      break;
    case "error":
      toast.error("An unexpected error occurred. Please try again.");
      break;
    case "payload":
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 min-w-80 overflow-x-auto rounded-md p-4 bg-zinc-800 text-zinc-300">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
          "--normal-bg": "var(--color-zinc-900)",
          "--normal-border": "var(--color-zinc-700)",
          "--normal-text": "var(--color-zinc-100)",
          width: "fit-content",
          maxWidth: "90vw",
        } as React.CSSProperties,
      });
      break;
    default:
      toast("An unexpected error occurred. Please try again.");
      break;
  }
}

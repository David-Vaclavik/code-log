"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function redirectAfterAuth(path = "/", type: "layout" | "page" = "layout") {
  // Purge the cache for the entire layout
  revalidatePath(path, type);
  redirect(path);
  // any code after redirect will not be executed!
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function redirectAfterAuth(path = "/") {
  // Purge the cache for the entire layout
  revalidatePath("/", "layout");
  redirect(path);
  // any code after redirect will not be executed!
}

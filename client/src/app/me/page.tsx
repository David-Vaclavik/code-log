import { LogoutButton } from "@/components/logout-button";
import { User } from "@/lib/types";
import { cookies } from "next/headers";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
};

export default async function UserPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user: User | null = await getUser(token);
  const imageSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&size=256`;

  if (!user) {
    return (
      <div>
        <h1>No user logged in</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 bg-card p-6 border border-border rounded-lg shadow-md">
        <div className="relative size-64 rounded-full overflow-hidden border border-border mb-8">
          <Image
            src={imageSrc}
            alt={user.name}
            fill
            sizes="256px"
            loading="eager"
            className="object-cover"
          />
        </div>

        <p>ID: {user.id}</p>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {/* <p>{user.isAdmin ? "Admin" : "Regular User"}</p> */}
      </div>

      <LogoutButton />
    </div>
  );
}

// Also used in header.
async function getUser(token: string | undefined): Promise<User | null> {
  if (!token) return null;

  try {
    const res = await fetch("http://localhost:3000/auth/me", {
      headers: { Cookie: `token=${token}` },
      cache: "no-store",
    });

    //TODO: handle 401/403 in a better way, maybe add toaster notification
    // if (res.status === 401 || res.status === 403) return null;

    if (!res.ok) {
      console.error(`[Page/me] Auth service error: ${res.status}`);
      return null;
    }

    const data: { user: User } = await res.json();
    return data.user ?? null;
  } catch (error) {
    console.error(
      "[Page/me] Failed to fetch user:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

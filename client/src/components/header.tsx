import { User } from "@/lib/types";
import { cookies } from "next/headers";
import Link from "next/link";
// import { LogoutButton } from "./logout-button";
import Image from "next/image";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user: User | null = await getUser(token);
  //? Dicebear is more complex option, maybe later
  const imageSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`;

  return (
    <header className="w-full max-w-5xl flex items-center justify-between py-4">
      <Link href="/">
        <h1>Code.Log</h1>
      </Link>

      {/* Main Nav */}
      <nav className="flex gap-2">
        {/* if we have more links let's make it a map ul-li tags */}
        <div className="flex px-4 py-2">
          <Link
            href="/posts"
            className="underline-slide-x text-xl font-medium hover:text-yellow-500 transition-colors"
          >
            Posts
          </Link>
        </div>
      </nav>

      {/* User login/profile Nav */}
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <Link href="/me" className="flex items-center">
              <Image
                src={imageSrc}
                alt={user.name || "User"}
                width={36}
                height={36}
                className="rounded-full"
              />
            </Link>

            {/* <LogoutButton /> */}
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

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
      console.error(`[Header] Auth service error: ${res.status}`);
      return null;
    }

    const data: { user: User } = await res.json();
    return data.user ?? null;
  } catch (error) {
    // console.error("Error fetching user:", error);
    console.error("[Header] Failed to fetch user:", error instanceof Error ? error.message : error);
    return null;
  }
}

import { User } from "@/lib/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user: User | null = await getUser(token);

  return (
    <header className="w-full max-w-5xl flex items-center justify-between border-b border-gray-300 pb-4">
      <Link href="/">
        <h1>Code.Log</h1>
      </Link>

      <nav className="flex gap-2">
        <Link
          href="/posts"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Posts
        </Link>
      </nav>

      {/* User Nav */}
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            {/* The Link should be a profile picture */}
            <Link
              href="/me"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Profile
            </Link>

            <h3 className="text-zinc-300">{user.name}</h3>

            {user?.isAdmin && <h3>ADMIN</h3>}

            <LogoutButton />
          </div>
        ) : (
          <h3 className="text-zinc-300">No user logged</h3>
        )}

        {/* Later we will remove below buttons and will only show login when no user logged */}
        <Link
          href="/auth/login"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Login
        </Link>

        <Link
          href="/auth/register"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Register
        </Link>
      </div>
    </header>
  );
}

async function getUser(token: string | undefined): Promise<User | null> {
  if (token) {
    const res = await fetch("http://localhost:3000/auth/me", {
      headers: { Cookie: `token=${token}` },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return data.user;
    }
  }

  return null;
}

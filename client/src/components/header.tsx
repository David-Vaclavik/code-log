import { User } from "@/lib/types";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log(token);

  let user: User | null = null;
  if (token) {
    const res = await fetch("http://localhost:3000/auth/me", {
      headers: { Cookie: `token=${token}` }, // forward the cookie to the API
      cache: "no-store", // always fetch fresh, never cache auth state
    });
    if (res.ok) {
      const data = await res.json();
      user = data.user;
      // console.log(user);
    }
  }

  return (
    <header className="w-full max-w-3xl flex items-center justify-between border-b border-gray-300 pb-4">
      <Link href="/">
        <h1>Code.Log</h1>
      </Link>

      {user ? (
        <h3 className="text-zinc-300">{user.name}</h3>
      ) : (
        <h3 className="text-zinc-300">No user logged</h3>
      )}

      {user?.isAdmin && <h3>ADMIN</h3>}

      <nav className="flex gap-2">
        <Link
          href="/posts"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Posts
        </Link>
        <Link
          href="/auth/login"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Login
        </Link>
        <Link
          href="/auth/logout"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Logout
        </Link>
        <Link
          href="/auth/register"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}

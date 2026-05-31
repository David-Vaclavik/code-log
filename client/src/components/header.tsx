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
            <Link href="/me" className="flex items-center">
              <Image
                src={imageSrc}
                alt={user.name || "User"}
                width={36}
                height={36}
                className="rounded-full"
              />
            </Link>

            {/* {user?.isAdmin && <h3>ADMIN</h3>} */}

            {/* <h3 className="text-zinc-300">{user.name}</h3> */}
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

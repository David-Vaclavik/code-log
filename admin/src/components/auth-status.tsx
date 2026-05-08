import { User } from "@/lib/types";
import { cookies } from "next/headers";

export default async function AuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user: User | null = null;
  if (token) {
    const res = await fetch("http://localhost:3000/auth/me", {
      headers: { Cookie: `token=${token}` },
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      user = data.user;
    }
  }

  return (
    <div>
      {user ? (
        <h3 className="text-zinc-300">{user.name}</h3>
      ) : (
        <h3 className="text-zinc-300">No user logged</h3>
      )}

      {user?.isAdmin && <h3>ADMIN: true</h3>}
    </div>
  );
}

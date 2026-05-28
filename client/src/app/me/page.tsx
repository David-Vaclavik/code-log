import { LogoutButton } from "@/components/logout-button";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

export default async function UserPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user: User | null = await getUser(token);

  if (!user) {
    return (
      <div>
        <h1>No user logged in</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>User Profile</h1>

      <div className="flex flex-col gap-1">
        <p>ID: {user.id}</p>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.isAdmin ? "Admin" : "Regular User"}</p>
      </div>

      {/* //? maybe not needed */}
      <LogoutButton />
    </div>
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

"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch(`http://localhost:3000/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      // className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
      className="flex items-center justify-center bg-input/30 text-primary/90 font-[550] px-4 py-2 rounded-md border border-input/80 hover:bg-input/50 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:bg-primary/50"
    >
      Logout
    </button>
  );
}

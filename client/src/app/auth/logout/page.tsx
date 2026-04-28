"use client";

import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleSubmit = async () => {
    // e.preventDefault();

    const res = await fetch(`http://localhost:3000/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      // body: JSON.stringify(form),
    });

    const data = await res.json();
    // email: besicy@mailinator.com
    // password: Pa$$w0rd!

    // if (!res.ok) throw new Error("Failed to post comment");
    if (!res.ok) {
      alert(data.error);
      return;
    }

    console.log(data);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-8">
      <h1>Logout page</h1>
      <button
        onClick={handleSubmit}
        className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

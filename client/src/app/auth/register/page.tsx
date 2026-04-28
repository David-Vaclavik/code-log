"use client";

import { useRouter } from "next/navigation";
// import { useRouter } from "next/router"; - for old pages router
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(form);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    const res = await fetch(`http://localhost:3000/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    // password: Pa$$w0rd!

    // if (!res.ok) throw new Error("Failed to post comment");
    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-8">
      <h1>Register form</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="username"
          onChange={handleChange}
          className=" bg-zinc-600 py-1.5 px-3"
        />
        <input
          // type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          className=" bg-zinc-600 py-1.5 px-3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
          onChange={handleChange}
          className=" bg-zinc-600 py-1.5 px-3"
        />
        <button type="submit" className="bg-zinc-800">
          Submit
        </button>
      </form>
    </div>
  );
}

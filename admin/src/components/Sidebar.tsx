"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const navItems = {
  Auth: [
    // { label: "Home", href: "/" },
    { label: "Login", href: "/auth/login" },
    { label: "Register", href: "/auth/register" },
    { label: "Logout", href: "/auth/logout" },
    { label: "Testing forms", href: "/auth/test" },
  ],
  Posts: [
    { label: "Draft List", href: "/draft" },
    { label: "Draft New Post", href: "/draft/new" },
  ],
};

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-sidebar">
      <h2>Admin Dashboard</h2>

      {/* Auth Status - displays the current user and admin status, needs to be server component */}
      {children}

      <Button className="text-xl justify-start" variant={"link"} asChild>
        <Link href="/">Home</Link>
      </Button>

      {/* Auth Section */}
      <div className="flex flex-col gap-2">
        <h2>Auth</h2>

        {navItems.Auth.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              className={`text-xl justify-start ${isActive ? "bg-sidebar-accent" : ""}`}
              variant={"link"}
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          );
        })}
      </div>

      {/* Draft Section */}
      <div className="flex flex-col gap-2">
        <h2>Draft</h2>

        {navItems.Posts.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              className={`text-xl justify-start ${isActive ? "bg-sidebar-accent" : ""}`}
              variant={"link"}
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

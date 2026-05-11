import Link from "next/link";
import { Button } from "./ui/button";
import AuthStatus from "./auth-status";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-zinc-800">
      <h2>Admin Dashboard</h2>

      {/* Auth Status - displays the current user and admin status */}
      <AuthStatus />

      <Button className="text-xl justify-start" variant={"link"} asChild>
        <Link href="/">Home</Link>
      </Button>

      {/* Auth Section */}
      <div className="flex flex-col gap-2">
        <h2>Auth</h2>

        <Button className="text-xl justify-start" variant={"link"} asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button className="text-xl justify-start" variant={"link"} asChild>
          <Link href="/auth/register">Register</Link>
        </Button>
        <Button className="text-xl justify-start" variant={"link"} asChild>
          <Link href="/auth/logout">Logout</Link>
        </Button>
      </div>

      {/* Draft Section */}
      <div className="flex flex-col gap-2">
        <h2>Draft</h2>

        <Button className="text-xl justify-start" variant={"link"} asChild>
          <Link href="/draft">Drafts List</Link>
        </Button>
        <Button className="text-xl justify-start" variant={"link"} asChild>
          <Link href="/draft/1">Draft 1</Link>
        </Button>
        <Button className="text-xl justify-start" variant={"link"} asChild>
          <Link href="/draft/new">Draft New Post</Link>
        </Button>
      </div>
    </div>
  );
}

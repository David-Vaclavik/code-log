import Link from "next/link";
import { Button } from "./ui/button";
import AuthStatus from "./auth-status";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-8 p-8 min-h-full bg-zinc-800">
      <h2>Admin Dashboard</h2>

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
    </div>
  );
}

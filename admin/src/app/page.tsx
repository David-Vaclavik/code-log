import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <h1 className="text-3xl font-bold">Admin Landing Page</h1>

      <Button className="mt-4" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
    </div>
  );
}

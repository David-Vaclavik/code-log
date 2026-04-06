import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full max-w-3xl flex items-center justify-between border-b border-gray-300 pb-4">
      <Link href="/">
        <h1>Code.Log</h1>
      </Link>

      <nav>
        <Link
          href="/posts"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Posts
        </Link>
      </nav>
    </header>
  );
}

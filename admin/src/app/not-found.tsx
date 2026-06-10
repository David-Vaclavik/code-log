import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl text-center mb-4">Not Found</h2>
        <p className="text-xl mb-10">Could not find requested resource</p>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-[550] py-3 px-6 rounded-md hover:bg-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:bg-primary/50"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

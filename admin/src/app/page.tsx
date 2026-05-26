import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <h1 className="text-3xl font-bold">Admin Landing Page</h1>
    </div>
  );
}

import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing posts and users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        inter.variable,
        "font-sans",
        "dark"
      )}
    >
      <body
        className={cn(
          "min-h-full flex font-sans",
          "bg-black text-zinc-100" // This is in client in global.css layer base - py-16 px-8
        )}
      >
        <TooltipProvider>
          <nav>
            <Sidebar />
          </nav>
          <main className="p-8 flex-1">{children}</main>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}

"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 z-50 flex items-center justify-center bg-input/0 text-primary/90 font-[510] p-2 rounded-md opacity-0 hover:bg-input/80 active:bg-input/40 group-hover:opacity-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/70 cursor-pointer"
    >
      <div className={`opacity-100`}>
        <Copy />
      </div>
      <div
        className={`absolute transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"}`}
      >
        <CopyCheck />
      </div>
    </button>
  );
}

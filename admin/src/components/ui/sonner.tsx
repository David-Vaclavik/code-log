"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--border-radius": "var(--radius)",

          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",

          "--success-bg": "var(--success-color-bg)",
          "--success-text": "var(--success-color-text)",
          "--success-border": "var(--success-color-border)",

          "--warning-bg": "var(--warning-color-bg)",
          "--warning-text": "var(--warning-color-text)",
          "--warning-border": "var(--warning-color-border)",

          "--error-bg": "var(--destructive-color-bg)",
          "--error-text": "var(--destructive-color-text)",
          "--error-border": "var(--destructive-color-border)",

          "--info-bg": "var(--info-color-bg)",
          "--info-text": "var(--info-color-text)",
          "--info-border": "var(--info-color-border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

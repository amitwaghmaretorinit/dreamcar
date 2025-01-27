"use client";

import { useTheme } from "@/components/theme-provider";
import { usePathname } from "next/navigation";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  if (pathname.includes("studio")) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-lg p-2 hover:bg-muted"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
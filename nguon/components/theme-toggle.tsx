import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex size-11 shrink-0 items-center justify-center text-fg transition-colors duration-150 hover:text-accent"
      aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      aria-pressed={isDark}
      title={isDark ? "Giao diện sáng" : "Giao diện tối"}
    >
      <Sun
        className={isDark ? "size-4" : "hidden"}
        strokeWidth={1.6}
        aria-hidden="true"
      />
      <Moon
        className={isDark ? "hidden" : "size-4"}
        strokeWidth={1.6}
        aria-hidden="true"
      />
    </button>
  );
}

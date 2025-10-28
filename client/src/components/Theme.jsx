import { Moon, Sun } from "lucide-react"; // If you're not using lucide, replace icons
import { useEffect, useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState(() => {
    // Optional: Fallback to system preference if no localStorage value
    if (localStorage.getItem("theme") === null) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement; // Correctly target <html> root

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      className="p-2 rounded-lg bg-secondary hover:bg-accent transition"
      title="Toggle Theme"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" /> 
      )}
    </button>
  );
};

export default Theme;

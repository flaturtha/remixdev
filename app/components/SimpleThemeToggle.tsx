import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function SimpleThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  // Initialize on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  
  const toggleTheme = () => {
    if (typeof window === "undefined") return;
    
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Update DOM
    document.documentElement.classList.toggle("dark", newIsDark);
    
    // Save preference
    try {
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
    } catch (e) {
      console.error("Failed to save theme preference", e);
    }
    
    console.log("Theme toggled to:", newIsDark ? "dark" : "light");
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
} 
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function FinalDarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  // Initialize on client-side only
  useEffect(() => {
    if (typeof document === "undefined") return;
    
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    if (typeof document === "undefined") return;
    
    // Toggle dark mode
    const newIsDark = !isDark;
    
    // Apply the change directly to HTML element
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save preference directly
    try {
      localStorage.setItem("darkMode", newIsDark ? "dark" : "light");
    } catch (e) {
      console.error("Failed to save dark mode preference:", e);
    }
    
    // Update state
    setIsDark(newIsDark);
    
    console.log("Dark mode toggled to:", newIsDark ? "dark" : "light");
  };
  
  return (
    <button
      onClick={toggleDarkMode}
      type="button"
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
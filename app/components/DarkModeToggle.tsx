import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  // Check dark mode on mount
  useEffect(() => {
    if (typeof document === "undefined") return;
    
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    
    console.log("Initial dark mode state:", isDarkMode);
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    if (typeof document === "undefined") return;
    
    // Toggle dark mode
    const newIsDark = !isDark;
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save preference
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("darkMode", newIsDark ? "dark" : "light");
    }
    
    setIsDark(newIsDark);
    console.log("Dark mode toggled to:", newIsDark);
  };
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      style={{
        backgroundColor: isDark ? "#333" : "#f8f8f8",
        color: isDark ? "#fff" : "#333",
      }}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
} 
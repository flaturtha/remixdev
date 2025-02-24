import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function MinimalDarkMode() {
  const [isDark, setIsDark] = useState(false);
  
  // Initialize on client-side only
  useEffect(() => {
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    
    // Log for debugging
    console.log("MinimalDarkMode: Initial state =", isDarkMode);
  }, []);
  
  const toggleDarkMode = () => {
    // Toggle dark mode
    const newIsDark = !isDark;
    
    // Apply the change
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save preference
    try {
      localStorage.setItem("darkMode", newIsDark ? "dark" : "light");
    } catch (e) {
      console.error("Failed to save dark mode preference:", e);
    }
    
    // Update state
    setIsDark(newIsDark);
    
    // Log for debugging
    console.log("MinimalDarkMode: Toggled to", newIsDark ? "dark" : "light");
  };
  
  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        padding: "8px",
        borderRadius: "50%",
        backgroundColor: isDark ? "#333" : "#f8f8f8",
        color: isDark ? "#fff" : "#333",
        border: "none",
        cursor: "pointer"
      }}
    >
      {isDark ? (
        <Sun style={{ width: "20px", height: "20px" }} />
      ) : (
        <Moon style={{ width: "20px", height: "20px" }} />
      )}
    </button>
  );
} 
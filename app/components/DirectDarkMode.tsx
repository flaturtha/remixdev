import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function DirectDarkMode() {
  const [isDark, setIsDark] = useState(false);
  
  // Initialize on client-side only
  useEffect(() => {
    if (typeof document === "undefined") return;
    
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    
    // Also check for system preference if no preference is set
    if (!localStorage.getItem("darkMode")) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
    
    console.log("DirectDarkMode initialized:", isDarkMode);
  }, []);
  
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
    
    console.log("DirectDarkMode toggled to:", newIsDark ? "dark" : "light");
  };
  
  // Use direct DOM manipulation for the button to avoid any framework issues
  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      style={{
        padding: "8px",
        borderRadius: "50%",
        backgroundColor: isDark ? "#333" : "#f8f8f8",
        color: isDark ? "#fff" : "#333",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
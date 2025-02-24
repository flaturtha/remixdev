import { Moon, Sun } from "lucide-react";

export default function SuperSimpleDarkMode() {
  // This function will be called when the component is rendered
  // It checks if dark mode is currently active
  const isDarkMode = () => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  };
  
  // This function toggles dark mode
  const toggleDarkMode = () => {
    if (typeof document === "undefined") return;
    
    const html = document.documentElement;
    const currentlyDark = html.classList.contains("dark");
    
    // Toggle the dark class
    if (currentlyDark) {
      html.classList.remove("dark");
      localStorage.setItem("darkMode", "light");
      console.log("Switched to light mode");
    } else {
      html.classList.add("dark");
      localStorage.setItem("darkMode", "dark");
      console.log("Switched to dark mode");
    }
    
    // Force re-render by updating a data attribute
    html.setAttribute("data-theme-updated", Date.now().toString());
  };
  
  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      style={{
        padding: "8px",
        borderRadius: "50%",
        backgroundColor: isDarkMode() ? "#333" : "#f8f8f8",
        color: isDarkMode() ? "#fff" : "#333",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {isDarkMode() ? (
        <Sun style={{ width: "20px", height: "20px" }} />
      ) : (
        <Moon style={{ width: "20px", height: "20px" }} />
      )}
    </button>
  );
} 
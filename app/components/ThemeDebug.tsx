import { useEffect, useState } from "react";

export default function ThemeDebug() {
  const [debug, setDebug] = useState({
    isDark: false,
    theme: "",
    mediaPreference: ""
  });
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const updateDebug = () => {
      setDebug({
        isDark: document.documentElement.classList.contains("dark"),
        theme: localStorage.getItem("theme") || "not set",
        mediaPreference: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      });
    };
    
    updateDebug();
    
    // Update when theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateDebug();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  if (process.env.NODE_ENV !== "development") return null;
  
  return (
    <div className="fixed bottom-20 right-4 bg-white dark:bg-gray-800 p-4 rounded shadow-lg z-50 text-xs">
      <h3 className="font-bold mb-2">Theme Debug</h3>
      <ul>
        <li>Dark Mode: {debug.isDark ? "Yes" : "No"}</li>
        <li>Stored Theme: {debug.theme}</li>
        <li>System Preference: {debug.mediaPreference}</li>
      </ul>
    </div>
  );
} 
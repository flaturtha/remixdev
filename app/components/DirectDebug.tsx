import { useEffect, useState } from "react";

export default function DirectDebug() {
  const [debug, setDebug] = useState({
    isDark: false,
    darkModeClass: false,
    preference: "",
    systemPreference: ""
  });
  
  useEffect(() => {
    if (typeof document === "undefined") return;
    
    function updateDebug() {
      const isDark = document.documentElement.classList.contains("dark");
      setDebug({
        isDark: isDark,
        darkModeClass: document.documentElement.classList.contains("dark"),
        preference: localStorage.getItem("darkMode") || "not set",
        systemPreference: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      });
    }
    
    updateDebug();
    
    // Listen for class changes on the html element
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
  
  return (
    <div style={{
      position: "fixed",
      bottom: "50px",
      right: "10px",
      backgroundColor: debug.isDark ? "#333" : "#f8f8f8",
      color: debug.isDark ? "#fff" : "#333",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "12px",
      zIndex: 9999,
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
    }}>
      <div><strong>Dark Mode Debug</strong></div>
      <div>Dark Mode: {debug.isDark ? "ON" : "OFF"}</div>
      <div>Dark Class: {debug.darkModeClass ? "YES" : "NO"}</div>
      <div>Preference: {debug.preference}</div>
      <div>System: {debug.systemPreference}</div>
      <button 
        onClick={() => {
          document.documentElement.classList.toggle("dark");
          console.log("Toggled dark mode via debug panel");
        }}
        style={{
          marginTop: "5px",
          padding: "3px 8px",
          backgroundColor: debug.isDark ? "#555" : "#ddd",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer"
        }}
      >
        Toggle
      </button>
    </div>
  );
} 
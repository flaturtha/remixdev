import { useEffect, useState } from "react";

export default function DarkModeDebug() {
  const [state, setState] = useState({
    isDark: false,
    preference: "",
    systemPreference: ""
  });
  
  useEffect(() => {
    function updateState() {
      setState({
        isDark: document.documentElement.classList.contains("dark"),
        preference: localStorage.getItem("darkMode") || "not set",
        systemPreference: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      });
    }
    
    updateState();
    
    // Update when dark mode changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          updateState();
        }
      }
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  if (process.env.NODE_ENV !== "development") return null;
  
  return (
    <div style={{
      position: "fixed",
      bottom: "10px",
      left: "10px",
      backgroundColor: state.isDark ? "#333" : "#f8f8f8",
      color: state.isDark ? "#fff" : "#333",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "12px",
      zIndex: 9999
    }}>
      <div>Dark Mode: {state.isDark ? "ON" : "OFF"}</div>
      <div>Preference: {state.preference}</div>
      <div>System: {state.systemPreference}</div>
    </div>
  );
} 
import { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const element = document.documentElement;
    const scrollTop = element.scrollTop || document.body.scrollTop;
    const scrollHeight = element.scrollHeight || document.body.scrollHeight;
    const clientHeight = element.clientHeight;
    
    const windowHeight = scrollHeight - clientHeight;
    const currentPosition = scrollTop;
    
    // Calculate width as a percentage
    const percentageScrolled = (currentPosition / windowHeight) * 100;
    
    setWidth(percentageScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className="h-full bg-primary transition-all duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
} 
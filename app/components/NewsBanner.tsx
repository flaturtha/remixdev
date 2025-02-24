import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "@remix-run/react";

export default function NewsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if banner was previously dismissed
    const bannerDismissed = localStorage.getItem("newsBannerDismissed");
    if (!bannerDismissed) {
      setIsVisible(true);
    }
  }, []);
  
  const dismissBanner = () => {
    setIsVisible(false);
    localStorage.setItem("newsBannerDismissed", "true");
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm md:text-base">
          <span className="font-bold">New:</span> Check out our latest collection of vintage true crime stories! 
          <Link to="/collections/vintage-true-crime" className="ml-2 underline">
            Learn more
          </Link>
        </p>
        <button 
          onClick={dismissBanner}
          className="ml-4 p-1 hover:bg-primary-foreground/10 rounded-full"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if consent was previously given
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);
  
  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };
  
  const acceptEssential = () => {
    localStorage.setItem("cookieConsent", "essential");
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 p-4 md:p-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-grow">
            <h3 className="text-lg font-medium mb-2">Cookie Consent</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
              <Link to="/privacy" className="underline ml-1">
                Read our Cookie Policy
              </Link>
            </p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={acceptEssential}
              className="whitespace-nowrap"
            >
              Essential Only
            </Button>
            <Button 
              onClick={acceptAll}
              className="whitespace-nowrap"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
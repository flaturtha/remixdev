import { useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const navigation = useNavigation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    if (navigation.state === "loading") {
      setIsTransitioning(true);
    } else {
      // Add a small delay before removing the transition class
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [navigation.state]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? "opacity-50" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
} 
import { useNavigation, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigation = useNavigation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(location);

  useEffect(() => {
    if (navigation.state === "loading") {
      setIsTransitioning(true);
    }
  }, [navigation.state]);

  useEffect(() => {
    if (isTransitioning && navigation.state === "idle") {
      setTimeout(() => {
        setCurrentLocation(location);
        setIsTransitioning(false);
      }, 300); // Match this with the CSS transition duration
    }
  }, [isTransitioning, navigation.state, location]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
} 
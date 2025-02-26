import { useNavigation, useLocation } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ClientOnly } from "~/components/ClientOnly";

interface AdvancedPageTransitionProps {
  children: React.ReactNode;
}

export function AdvancedPageTransition({ children }: AdvancedPageTransitionProps) {
  const navigation = useNavigation();
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  
  useEffect(() => {
    if (navigation.state === "loading") {
      setIsNavigating(true);
    } else {
      // Small delay to ensure animations complete
      const timeout = setTimeout(() => {
        setIsNavigating(false);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [navigation.state]);

  // Simple version without AnimatePresence for better SSR compatibility
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
} 
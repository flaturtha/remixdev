import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@remix-run/react";

interface ProductLayoutProps {
  children: React.ReactNode;
}

export function ProductLayout({ children }: ProductLayoutProps) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 
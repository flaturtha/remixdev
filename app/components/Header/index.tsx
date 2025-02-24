import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react"
import { Link } from "@remix-run/react"
import Logo from "./Logo"
import NavLinks from "./NavLinks"
import CSSMobileMenu from "../CSSMobileMenu"
import FinalDarkModeToggle from "~/components/FinalDarkModeToggle"
import SearchModal from "~/components/SearchModal"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 py-3 px-4 md:py-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks closeMobileMenu={() => {}} />
          </div>
          
          {/* Header icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>
            
            <Link to="/cart" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
            
            <FinalDarkModeToggle />
            
            {/* CSS-only mobile menu */}
            <CSSMobileMenu />
          </div>
        </div>
      </div>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  )
} 
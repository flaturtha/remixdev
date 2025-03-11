import { useState } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import { Link } from "@remix-run/react";
import NavLinks from "~/components/Navigation/NavLinks";
import CSSMobileMenu from "~/components/CSSMobileMenu";
import FinalDarkModeToggle from "~/components/FinalDarkModeToggle";
import SearchModal from "~/components/SearchModal";
import Logo from "~/components/Header/Logo";
import { Input } from "~/components/ui/input";
import { ctaButton } from "~/config/navigation";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top row with search and icons */}
      <div className="py-2">
        <div className="container mx-auto px-4 grid grid-cols-12 items-center">
          {/* Left empty space */}
          <div className="hidden md:block md:col-span-3"></div>
          
          {/* Centered search bar */}
          <div className="col-span-12 md:col-span-6 flex justify-center">
            <div className="w-full max-w-md relative">
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full pr-10"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Right-aligned icons */}
          <div className="hidden md:flex md:col-span-3 items-center space-x-4 justify-end">
            <Link to="/account" className="text-gray-800 hover:text-gray-600 transition-colors">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
            
            <Link to="/cart" className="text-gray-800 hover:text-gray-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
            
            <FinalDarkModeToggle />
          </div>
        </div>
      </div>
      
      {/* Main navigation row */}
      <div className="py-3 px-4 md:py-4">
        <div className="container mx-auto grid grid-cols-12 items-center">
          {/* Logo on left */}
          <div className="col-span-3">
            <Logo />
          </div>
          
          {/* Desktop navigation in center */}
          <nav className="hidden md:flex col-span-6 items-center justify-center space-x-12">
            <NavLinks />
          </nav>
          
          {/* Read Free button on right */}
          <div className="hidden md:flex col-span-3 justify-end">
            <Link 
              to={ctaButton.path} 
              className={ctaButton.className}
            >
              {ctaButton.title}
            </Link>
          </div>
          
          {/* Mobile menu toggle and icons - only visible on mobile */}
          <div className="col-span-9 md:hidden flex items-center justify-end space-x-4">
            <Link to="/account" className="text-gray-800 hover:text-gray-600 transition-colors">
              <User className="h-5 w-5" />
            </Link>
            
            <Link to="/cart" className="text-gray-800 hover:text-gray-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            
            <FinalDarkModeToggle />
            
            <CSSMobileMenu />
          </div>
        </div>
      </div>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
} 
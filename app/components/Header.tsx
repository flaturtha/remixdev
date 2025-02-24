import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWikiDropdownOpen, setIsWikiDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsWikiDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo_full.svg" 
              alt="Tales of Murder" 
              className="h-8 xs:h-9 md:h-10 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/shop" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Collections
            </Link>
            <div className="relative">
              <Link 
                to="/murderwiki" 
                className="text-gray-700 hover:text-gray-900 transition-colors mr-1"
              >
                MurderWiki
              </Link>
              <button 
                ref={buttonRef}
                className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsWikiDropdownOpen(!isWikiDropdownOpen)}
                aria-expanded={isWikiDropdownOpen}
                aria-haspopup="true"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${isWikiDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isWikiDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <Link 
                    to="/murderwiki" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsWikiDropdownOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/murderwiki/read-free" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsWikiDropdownOpen(false)}
                  >
                    Read Free
                  </Link>
                  <Link 
                    to="/murderwiki/glossary" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsWikiDropdownOpen(false)}
                  >
                    Glossary
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/shop" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/collections" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Collections
          </Link>
          <div>
            <div className="flex items-center">
              <Link
                to="/murderwiki"
                className="flex-grow px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                MurderWiki
              </Link>
              <button 
                className="px-3 py-2"
                onClick={() => setIsWikiDropdownOpen(!isWikiDropdownOpen)}
                aria-expanded={isWikiDropdownOpen}
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${isWikiDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            <div className={`pl-4 ${isWikiDropdownOpen ? 'block' : 'hidden'}`}>
              <Link 
                to="/murderwiki" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/murderwiki/read-free" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Read Free
              </Link>
              <Link 
                to="/murderwiki/glossary" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Glossary
              </Link>
            </div>
          </div>
          
          <Link 
            to="/about" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </header>
  );
} 
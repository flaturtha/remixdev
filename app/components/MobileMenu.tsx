import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle menu toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="block p-3 text-gray-800"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Menu Panel */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-white shadow-lg z-50"
        >
          <nav className="container mx-auto px-4 py-6">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/about" 
                  className="block py-2 text-lg text-gray-800 hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections" 
                  className="block py-2 text-lg text-gray-800 hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className="block py-2 text-lg text-gray-800 hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  Shop All
                </Link>
              </li>
              
              <li className="pt-4 border-t border-gray-100">
                <h3 className="font-medium mb-2">Shop Collections</h3>
                <ul className="pl-2 space-y-3 mt-2">
                  <li>
                    <Link 
                      to="/collections/vintage-true-crime" 
                      className="block py-1 text-gray-700 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      Vintage True Crime
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/collections/pioneers-of-mystery" 
                      className="block py-1 text-gray-700 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      Pioneers of Mystery
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/collections/old-cap-collier" 
                      className="block py-1 text-gray-700 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      Old Cap Collier Library
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
} 
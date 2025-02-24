import { Link } from "@remix-run/react";
import { Menu, X } from "lucide-react";

export default function CSSMobileMenu() {
  return (
    <div className="md:hidden relative">
      <input 
        type="checkbox" 
        id="mobile-menu-toggle" 
        className="hidden peer"
      />
      <label 
        htmlFor="mobile-menu-toggle" 
        className="block p-3 text-gray-800 cursor-pointer"
      >
        <Menu className="h-6 w-6 peer-checked:hidden" />
        <X className="h-6 w-6 hidden peer-checked:block" />
      </label>
      
      <div className="fixed left-0 right-0 top-[60px] bg-white shadow-lg z-50 max-h-0 overflow-hidden peer-checked:max-h-[calc(100vh-60px)] transition-all duration-300 overflow-y-auto">
        <nav className="container mx-auto px-4 py-6">
          <ul className="space-y-4 max-w-lg mx-auto">
            <li>
              <Link 
                to="/about" 
                className="block py-2 text-lg text-gray-800 hover:text-gray-600 font-breamcatcher"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/collections" 
                className="block py-2 text-lg text-gray-800 hover:text-gray-600 font-breamcatcher"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link 
                to="/shop" 
                className="block py-2 text-lg text-gray-800 hover:text-gray-600 font-breamcatcher"
              >
                Shop All
              </Link>
            </li>
            
            <li className="pt-4 border-t border-gray-100">
              <h3 className="font-medium mb-2 font-breamcatcher">Shop Collections</h3>
              <ul className="pl-2 space-y-3 mt-2">
                <li>
                  <Link 
                    to="/collections/vintage-true-crime" 
                    className="block py-1 text-gray-700 hover:text-gray-900"
                  >
                    Vintage True Crime
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/collections/pioneers-of-mystery" 
                    className="block py-1 text-gray-700 hover:text-gray-900"
                  >
                    Pioneers of Mystery
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/collections/old-cap-collier" 
                    className="block py-1 text-gray-700 hover:text-gray-900"
                  >
                    Old Cap Collier Library
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
} 
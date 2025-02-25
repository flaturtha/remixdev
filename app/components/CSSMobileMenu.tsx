import { Link } from "@remix-run/react";
import { Menu, X } from "lucide-react";
import { allNavItems } from "~/config/navigation";

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
            {allNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={item.isButton 
                    ? "block py-2 text-lg text-white bg-[#8b0000] hover:bg-[#6d0000] px-4 rounded-md transition-colors"
                    : "block py-2 text-lg text-gray-800 hover:text-gray-600 font-breamcatcher"
                  }
                  onClick={() => document.getElementById('mobile-menu-toggle')?.click()}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
} 
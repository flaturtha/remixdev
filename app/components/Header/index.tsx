import { useState } from "react"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { Link } from "@remix-run/react"
import SearchBar from "./SearchBar"
import NavLinks from "./NavLinks"
import ShopDropdown from "./ShopDropdown"
import Logo from "./Logo"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="relative border-b">
      <div className="container mx-auto px-4 py-2">
        {/* Top bar with search and icons */}
        <div className="flex justify-between items-center mb-4">
          <SearchBar />

          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-black">
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </button>
            <button className="text-gray-600 hover:text-black">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </button>
          </div>
        </div>

        {/* Logo and navigation */}
        <div className="flex items-center justify-between">
          <Logo />

          <button className="md:hidden text-gray-600 hover:text-black z-20" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>

          <nav
            className={`
            ${isMobileMenuOpen ? "flex" : "hidden"}
            md:flex flex-col md:flex-row
            absolute md:relative top-full left-0 right-0
            bg-white md:bg-transparent
            border-t md:border-t-0
            z-10 md:z-auto
            p-4 md:p-0
            shadow-lg md:shadow-none
          `}
          >
            <NavLinks closeMobileMenu={closeMobileMenu} />
          </nav>
        </div>
      </div>
    </header>
  )
} 
/**
 * @deprecated This component has been replaced by the modular Header component in ~/components/Header/index.tsx
 * Please use the new Header component instead.
 */

"use client"

import { useState } from "react"
import { Link } from "@remix-run/react"
import { Search, User, ShoppingCart, Menu, ChevronDown, X } from "lucide-react"

export default function Header() {
  console.warn("Using deprecated v0-header component. Please use the new Header component from ~/components/Header instead.");
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="relative border-b">
      <div className="container mx-auto px-4 py-2">
        {/* Top bar with search and icons */}
        <div className="flex justify-between items-center mb-4">
          <form className="flex-grow max-w-sm mx-auto">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>

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
          <Link to="/" className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_full-SeQHREkB92sFihqEM8id69rzfNajdL.png"
              alt="Tales of Murder"
              width={300}
              height={60}
              className="w-full max-w-[300px] h-auto"
            />
          </Link>

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
            <ul className="flex flex-col md:flex-row md:items-center md:gap-6 w-full md:w-auto">
              <li>
                <Link to="/blog" className="block py-2 text-gray-600 hover:text-black" onClick={closeMobileMenu}>
                  Blog
                </Link>
              </li>
              <li className="relative">
                <button
                  className="flex items-center py-2 text-gray-600 hover:text-black w-full md:w-auto justify-between md:justify-start"
                  onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                >
                  Shop
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {isShopDropdownOpen && (
                  <div className="md:absolute left-0 top-full bg-white border rounded-md shadow-lg z-30 w-full md:w-48">
                    <div className="p-2">
                      <h3 className="font-semibold mb-2">Categories</h3>
                      <ul>
                        {[
                          "Vintage True Crime",
                          "Pioneers of Mystery",
                          "Old Cap Collier Library",
                          "Sax Rohmer Mysteries",
                          "Brady's Secret Service",
                        ].map((category) => (
                          <li key={category}>
                            <Link
                              to={`/shop/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block py-1 text-gray-600 hover:text-black"
                              onClick={closeMobileMenu}
                            >
                              {category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2 border-t">
                      <h3 className="font-semibold mb-2">Editions</h3>
                      <ul>
                        {["ebook", "novel", "A5", "large print", "audiobook"].map((edition) => (
                          <li key={edition}>
                            <Link
                              to={`/shop/edition/${edition.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block py-1 text-gray-600 hover:text-black"
                              onClick={closeMobileMenu}
                            >
                              {edition}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link to="/about" className="block py-2 text-gray-600 hover:text-black" onClick={closeMobileMenu}>
                  About
                </Link>
              </li>
              <li className="md:ml-4 mt-4 md:mt-0">
                <button
                  className="w-full md:w-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  onClick={closeMobileMenu}
                >
                  READ FREE
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}


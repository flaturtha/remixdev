import { useState } from "react"
import { Link } from "@remix-run/react"
import { ChevronDown } from "lucide-react"

interface ShopDropdownProps {
  closeMobileMenu: () => void
}

export default function ShopDropdown({ closeMobileMenu }: ShopDropdownProps) {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)

  return (
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
  )
} 
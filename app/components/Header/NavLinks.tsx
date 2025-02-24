import { Link } from "@remix-run/react"
import ShopDropdown from "./ShopDropdown"

interface NavLinksProps {
  closeMobileMenu: () => void
}

export default function NavLinks({ closeMobileMenu }: NavLinksProps) {
  return (
    <ul className="flex flex-col md:flex-row md:items-center md:gap-6 w-full md:w-auto">
      <li>
        <Link to="/blog" className="block py-2 text-gray-600 hover:text-black" onClick={closeMobileMenu}>
          Blog
        </Link>
      </li>
      
      <ShopDropdown closeMobileMenu={closeMobileMenu} />
      
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
  )
} 
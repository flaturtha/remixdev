import { Link } from "@remix-run/react"

interface NavLinksProps {
  closeMobileMenu: () => void
}

export default function NavLinks({ closeMobileMenu }: NavLinksProps) {
  return (
    <>
      <Link 
        to="/about" 
        className="text-gray-800 hover:text-gray-600 transition-colors"
      >
        About
      </Link>
      <Link 
        to="/collections" 
        className="text-gray-800 hover:text-gray-600 transition-colors"
      >
        Collections
      </Link>
      <Link 
        to="/shop" 
        className="text-gray-800 hover:text-gray-600 transition-colors"
      >
        Shop All
      </Link>
    </>
  )
} 
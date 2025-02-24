// components/Navbar.tsx

import { useState } from "react";
import { Link } from "@remix-run/react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="px-4 lg:px-16 h-14 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <img
          src="/atticus_opt.svg"
          alt="Atticus Logo"
          className="h-8 w-auto"
        />
        {/* Title visible on medium screens and larger */}
        <span className="ml-3 hidden md:inline text-xl lg:text-3xl font-bold text-gray-800 font-breamcatcher">
          TALES OF MURDER
        </span>
        <span className="sr-only">Bookstore</span>
      </Link>

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-gray-800 hover:text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-4 sm:gap-6">
        <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
          Books
        </Link>
        <Link to="/authors" className="text-sm font-medium hover:underline underline-offset-4">
          Authors
        </Link>
        <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">
          About
        </Link>
        <Link to="/contact" className="text-sm font-medium hover:underline underline-offset-4">
          Contact
        </Link>
      </nav>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 right-4 w-48 bg-white shadow-lg rounded-md md:hidden">
          <nav className="flex flex-col py-2">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Books
            </Link>
            <Link
              to="/authors"
              className="px-4 py-2 text-sm font-medium hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Authors
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-sm font-medium hover:bg-gray-100"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-medium hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

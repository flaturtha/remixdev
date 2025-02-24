import { Link } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Tales of Murder Press</p>
          </div>
          <div className="flex gap-6">
            <a 
              href="/privacy" 
              className="text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <Link 
              to="/contact" 
              className="text-sm hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

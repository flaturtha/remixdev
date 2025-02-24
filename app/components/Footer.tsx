import { Link } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-white pt-12 md:pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img 
                src="/images/logo_full.svg" 
                alt="Tales of Murder" 
                className="h-8 xs:h-9 md:h-10 w-auto"
              />
              {/* Optional: Add text logo with Breamcatcher font */}
              {/* <span className="block mt-2 text-2xl font-breamcatcher">Tales of Murder</span> */}
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Tales of Murder is a specialty publisher dedicated to preserving and celebrating vintage mystery and detective fiction.
            </p>
            
            <h3 className="font-medium mb-2">Newsletter</h3>
            <p className="text-gray-600 mb-4">Sign up for our newsletter to only receive good things.</p>
            
            <form className="flex flex-col xs:flex-row gap-2 max-w-md">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow"
              />
              <Button type="submit" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
          
          <div className="mt-6 md:mt-0">
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/collections/vintage-true-crime" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Vintage True Crime
                </Link>
              </li>
              <li>
                <Link to="/collections/pioneers-of-mystery" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pioneers of Mystery
                </Link>
              </li>
              <li>
                <Link to="/collections/old-cap-collier" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Old Cap Collier Library
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 md:mt-0">
            <h3 className="font-medium mb-4">Location</h3>
            <p className="text-gray-600">
              675 Town Square Blvd<br />
              Building 1A, Suite 200, PMB 530<br />
              Garland, TX 75040<br />
              atticus@crowmail.co
            </p>
            
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                Facebook
              </a>
              <a href="https://instagram.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                Instagram
              </a>
              <a href="https://twitter.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tales of Murder Press. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

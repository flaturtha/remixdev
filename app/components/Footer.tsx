import { Link } from "@remix-run/react";
import { Facebook, Instagram, Twitter, Mail, MessageCircleQuestion, ImageIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/images/logo_full.svg" 
                alt="Tales of Murder" 
                className="h-10 w-auto mb-3"
              />
              <p className="text-gray-400 text-sm">
                Preserving classic mystery fiction for new (and old) generations of fans.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lg">Site Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-gray-400 hover:text-white transition-colors">
                  Vintage Mystery Library
                </Link>
              </li>
              <li>
                <a 
                  href="https://murderwiki.talesofmurder.com" 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MurderWiki
                </a>
              </li>
              <li>
                <Link to="/mission" className="text-gray-400 hover:text-white transition-colors">
                  Mission
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Shop & Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lg">Need Help?</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help/technical-support" className="text-gray-400 hover:text-white transition-colors">
                  Technical Support
                </Link>
              </li>
              <li>
                <Link to="/help/purchase-support" className="text-gray-400 hover:text-white transition-colors">
                  Purchase Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white flex items-center gap-1 hover:text-white transition-colors">
                  <MessageCircleQuestion size={16} /> Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lg">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com/talesofmurder" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com/talesofmurder" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram (Bookstagram)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://pinterest.com/talesofmurder" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Pinterest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImageIcon size={20} />
              </a>
              <a 
                href="https://twitter.com/talesofmurder" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X/Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:contact@talesofmurder.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            
            <p className="text-gray-400 text-sm">
              675 Town Square Blvd<br />
              Building 1A, Suite 200, PMB 530<br />
              Garland, TX 75040
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tales of Murder Press. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-sm text-gray-400 hover:text-white transition-colors">
              Shipping
            </Link>
            <Link to="/accessibility" className="text-sm text-gray-400 hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

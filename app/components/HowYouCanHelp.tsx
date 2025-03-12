import { Link } from "@remix-run/react";

export default function HowYouCanHelp() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-breamcatcher text-4xl md:text-5xl font-bold mb-6 text-center tracking-wider">How You Can Help</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Your support enables us to digitize, restore, and preserve classic mystery works for everyone to enjoy.
          </p>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#8b0000] mt-0.5">•</div>
                <div className="ml-2">
                  <h3 className="font-bold text-lg tracking-wide">BUY PREMIUM EDITIONS</h3>
                  <p className="text-gray-700">Every purchase directly funds our restoration and preservation efforts.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#8b0000] mt-0.5">•</div>
                <div className="ml-2">
                  <h3 className="font-bold text-lg tracking-wide">SHARE LINKS TO FREE CONTENT</h3>
                  <p className="text-gray-700">Help us spread these classic works to other mystery enthusiasts.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[#8b0000] mt-0.5">•</div>
                <div className="ml-2">
                  <h3 className="font-bold text-lg tracking-wide">VOLUNTEER</h3>
                  <p className="text-gray-700">Contribute your skills to our ongoing preservation projects.</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-6 text-center">
              <Link 
                to="/mission/preservation" 
                className="text-[#8b0000] hover:underline font-medium"
              >
                Learn more about our preservation work →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
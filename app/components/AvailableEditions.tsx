import { Link } from "@remix-run/react";
import { 
  Book, 
  BookMarked, 
  Headphones, 
  BookOpen, 
  Smartphone, 
  PenSquare 
} from 'lucide-react';

export default function AvailableEditions() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Available Editions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <Link to="/library" className="p-4 bg-[#8b0000] rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <BookOpen className="h-10 w-10 mx-auto mb-3 text-white" />
            <h3 className="font-bold text-white tracking-wider">FREE ONLINE</h3>
            <p className="text-sm text-white/90">Read in Browser</p>
          </Link>
          
          <Link to="/formats/ebook" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Smartphone className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
            <h3 className="font-bold tracking-wider">eBOOK</h3>
            <p className="text-sm text-gray-600">ePub & Kindle</p>
          </Link>
          
          <Link to="/formats/paperback" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Book className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
            <h3 className="font-bold tracking-wider">POCKETBOOK PAPERBACK</h3>
            <p className="text-sm text-gray-600">5x8", 10pt font</p>
          </Link>
          
          <Link to="/formats/a5" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <BookMarked className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
            <h3 className="font-bold tracking-wider">ARMCHAIR PAPERBACK</h3>
            <p className="text-sm text-gray-600">5.8x8.3", 11pt font</p>
          </Link>
          
          <Link to="/formats/large-print" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute w-[150%] text-center left-[-25%] top-[20%] rotate-[-35deg] bg-[#8b0000] text-white py-1 shadow-md text-xs font-semibold z-10">
              Coming Soon
            </div>
            <PenSquare className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
            <h3 className="font-bold tracking-wider">LARGE PRINT</h3>
            <p className="text-sm text-gray-600">Easy Reading</p>
          </Link>
          
          <Link to="/formats/audiobook" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute w-[150%] text-center left-[-25%] top-[20%] rotate-[-35deg] bg-[#8b0000] text-white py-1 shadow-md text-xs font-semibold z-10">
              Coming Soon
            </div>
            <Headphones className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
            <h3 className="font-bold tracking-wider">AUDIOBOOK</h3>
            <p className="text-sm text-gray-600">Professional Narration</p>
          </Link>
        </div>
      </div>
    </section>
  );
} 
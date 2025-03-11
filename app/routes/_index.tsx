import { redirect } from "@remix-run/node";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Book, Bookmark, RefreshCw, ChevronLeft, ChevronRight, Headphones, BookOpen, Smartphone, FileDigit, PenSquare } from 'lucide-react';
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";

// Mock data for featured books
const featuredBooks = [
  {
    id: "1",
    title: "BRADY'S AND THE CHINESE IDOL",
    author: "A New York Detective",
    cover: "/images/covers/chinese-idol.png",
    path: "/library/bradys-and-the-chinese-idol"
  },
  {
    id: "2",
    title: "THE DEAD SECRET",
    author: "Wilke Collins",
    cover: "/images/covers/dead-secret.png",
    path: "/library/dead-secret"
  },
  {
    id: "3",
    title: "THE EXPRESSMAN AND THE DETECTIVE",
    author: "Allan Pinkerton",
    cover: "/images/covers/expressman.png",
    path: "/library/expressman-and-the-detective"
  },
  {
    id: "4",
    title: "BAT WING",
    author: "Sax Rohmer",
    cover: "/images/covers/bat-wing.png",
    path: "/library/bat-wing"
  },
  {
    id: "5",
    title: "BRADY'S AND THE CHINESE IDOL",
    author: "A New York Detective",
    cover: "/images/covers/chinese-idol.png",
    path: "/library/bradys-and-the-chinese-idol"
  },
  {
    id: "6",
    title: "THE DEAD SECRET",
    author: "Wilke Collins",
    cover: "/images/covers/dead-secret.png",
    path: "/library/dead-secret"
  },
  {
    id: "7",
    title: "BRADY'S AND THE CHINESE IDOL",
    author: "A New York Detective",
    cover: "/images/covers/chinese-idol.png",
    path: "/library/bradys-and-the-chinese-idol"
  },
  {
    id: "8",
    title: "THE DEAD SECRET",
    author: "Wilke Collins",
    cover: "/images/covers/dead-secret.png",
    path: "/library/dead-secret"
  },
  {
    id: "9",
    title: "THE EXPRESSMAN AND THE DETECTIVE",
    author: "Allan Pinkerton",
    cover: "/images/covers/expressman.png",
    path: "/library/expressman-and-the-detective"
  },
  {
    id: "10",
    title: "BAT WING",
    author: "Sax Rohmer",
    cover: "/images/covers/bat-wing.png",
    path: "/library/bat-wing"
  },
  {
    id: "11",
    title: "BRADY'S AND THE CHINESE IDOL",
    author: "A New York Detective",
    cover: "/images/covers/chinese-idol.png",
    path: "/library/bradys-and-the-chinese-idol"
  },
  {
    id: "12",
    title: "THE DEAD SECRET",
    author: "Wilke Collins",
    cover: "/images/covers/dead-secret.png",
    path: "/library/dead-secret"
  }
];

// export const loader: LoaderFunction = async () => {
//   return redirect("/lp/coming-soon2?utm_source=1");
// };

export const meta: MetaFunction = () => {
  return [
    { title: "Tales of Murder - A Vintage Mystery Library" },
    { name: "description", content: "Preserving classic mystery fiction for new (and old) generations of fans." },
  ];
};

export default function Index() {
  // State for featured book of the day/week
  const [featuredBook, setFeaturedBook] = useState(featuredBooks[0]);
  
  // Select a random featured book on load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * featuredBooks.length);
    setFeaturedBook(featuredBooks[randomIndex]);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Featured Book of the Day/Week */}
      <section 
        className="w-screen relative fade-in bg-cover bg-center py-16 xs:py-20 md:py-32"
        style={{ 
          backgroundImage: 'url("/images/old-cap-collier.png")',
          margin: '0 -16px',
          width: '100vw',
          maxWidth: '100vw',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* Book Cover */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              <img 
                src="/images/ebook-cover.png" 
                alt="Cover of Old Broadbrim: Into the Heart of Australia"
                className="w-64 h-auto shadow-2xl rounded"
              />
            </div>
            
            {/* Book Info & CTAs */}
            <div className="w-full md:w-2/3 text-center md:text-left backdrop-blur-sm bg-white/30 p-6 rounded-lg shadow-sm">
              <div className="mb-2 text-[#8b0000]">FEATURED BOOK OF THE DAY</div>
              <h1 className="font-breamcatcher text-4xl xs:text-5xl md:text-6xl font-bold mb-2 text-gray-900">INTO THE HEART OF AUSTRALIA</h1>
              <p className="text-xl mb-4 text-gray-800">by The Author of Old Broadbrim</p>
              <p className="text-lg xs:text-xl mb-8 text-gray-700">
                A wealthy recluse's chilling bargain leads Old Broadbrim into a web of shadows, betrayal, and murder, spanning continents and testing his resolve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  to="/library/into-the-heart-of-australia" 
                  className="inline-block bg-[#8b0000] text-white px-8 py-3 rounded-md hover:bg-[#6d0000] transition-colors hover-lift"
                >
                  Read Free
                </Link>
                <Link 
                  to="/shop/library/into-the-heart-of-australia" 
                  className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Buy & Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mini Carousel / Horizontal Scroller */}
      <section className="bg-white border-b border-gray-100 w-screen" style={{ margin: '0 -16px', maxWidth: '100vw' }}>
        <div className="relative w-full">
          <div className="flex justify-center">
            <div className="w-full">
              <div 
                className="flex flex-nowrap overflow-x-auto px-4" 
                style={{ 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <style>
                  {`
                    .flex-nowrap::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>
                {featuredBooks.map((book) => (
                  <Link 
                    key={book.id} 
                    to={book.path} 
                    className="flex-shrink-0"
                  >
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      style={{ 
                        height: "400px", 
                        width: "auto"
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full text-[#8b0000] hover:bg-white focus:outline-none z-10 shadow-md"
            aria-label="Scroll left"
            onClick={() => {
              const container = document.querySelector('.flex-nowrap');
              if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
            }}
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full text-[#8b0000] hover:bg-white focus:outline-none z-10 shadow-md"
            aria-label="Scroll right"
            onClick={() => {
              const container = document.querySelector('.flex-nowrap');
              if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
            }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </section>
      
      {/* Available Editions */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Available Editions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <Link to="/formats/ebook" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Smartphone className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
              <h3 className="font-bold">eBook</h3>
              <p className="text-sm text-gray-600">ePub & Kindle</p>
            </Link>
            
            <Link to="/formats/paperback" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Book className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
              <h3 className="font-bold">Paperback</h3>
              <p className="text-sm text-gray-600">Novel Trim Size</p>
            </Link>
            
            <Link to="/formats/a5" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FileDigit className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
              <h3 className="font-bold">A5 Edition</h3>
              <p className="text-sm text-gray-600">Compact Format</p>
            </Link>
            
            <Link to="/formats/large-print" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <PenSquare className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
              <h3 className="font-bold">Large Print</h3>
              <p className="text-sm text-gray-600">Easy Reading</p>
            </Link>
            
            <Link to="/formats/audiobook" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Headphones className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
              <h3 className="font-bold">Audiobook</h3>
              <p className="text-sm text-gray-600">Professional Narration</p>
            </Link>
            
            <Link to="/library" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <BookOpen className="h-10 w-10 mx-auto mb-3 text-[#8b0000]" />
              <h3 className="font-bold">Free Online</h3>
              <p className="text-sm text-gray-600">Read in Browser</p>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How You Can Help Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-breamcatcher text-4xl md:text-5xl font-bold mb-6 text-center">How You Can Help</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Your support enables us to digitize, restore, and preserve classic mystery works for everyone to enjoy.
            </p>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-[#8b0000] mt-0.5">•</div>
                  <div className="ml-2">
                    <h3 className="font-bold text-lg">Buy Premium Editions</h3>
                    <p className="text-gray-700">Every purchase directly funds our restoration and preservation efforts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-[#8b0000] mt-0.5">•</div>
                  <div className="ml-2">
                    <h3 className="font-bold text-lg">Share Links to Free Content</h3>
                    <p className="text-gray-700">Help us spread these classic works to other mystery enthusiasts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-[#8b0000] mt-0.5">•</div>
                  <div className="ml-2">
                    <h3 className="font-bold text-lg">Volunteer</h3>
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
      
      {/* Featured MurderWiki Articles */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="font-breamcatcher text-4xl md:text-5xl font-bold mb-8 text-center">Featured MurderWiki Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/800x450/8b0000/ffffff?text=Poisoner's+Handbook" 
                alt="Illustration of vintage poison bottles and lab equipment representing The Poisoner's Handbook article"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">The Poisoner's Handbook: Infamous Cases of Lethal Deception</h3>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis, justo nec ultricies commodo.
                </p>
                <a 
                  href="https://murderwiki.talesofmurder.com/articles/poisoners-handbook" 
                  className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Now
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/800x450/8b0000/ffffff?text=Locked+Room+Mysteries" 
                alt="Illustration of a locked room with mysterious elements representing the Locked Room Mysteries article"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Locked Room Mysteries: The Greatest Unsolved Crimes in Fiction and Reality</h3>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis, justo nec ultricies commodo.
                </p>
                <a 
                  href="https://murderwiki.talesofmurder.com/articles/locked-room-mysteries" 
                  className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Now
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/800x450/8b0000/ffffff?text=Forensic+Science" 
                alt="Illustration of early forensic equipment and investigation tools representing The Birth of Forensic Science article"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">The Birth of Forensic Science: How Detectives Learned to Read the Dead</h3>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis, justo nec ultricies commodo.
                </p>
                <a 
                  href="https://murderwiki.talesofmurder.com/articles/birth-of-forensic-science" 
                  className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter / Mailing List Sign-Up */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 xs:mb-6 text-gray-900">Stay Updated</h2>
            <p className="text-lg xs:text-xl mb-6 xs:mb-8 text-gray-700">
              Join our mailing list for monthly vintage mystery highlights and exclusive subscriber benefits.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow bg-white text-gray-900 placeholder:text-gray-500 border-gray-300"
              />
              <Button 
                type="submit" 
                className="whitespace-nowrap bg-[#8b0000] text-white hover:bg-[#6d0000] font-medium"
              >
                Help Preserve Vintage Mysteries
              </Button>
            </form>
            <p className="mt-4 text-sm text-gray-500">No spam, just monthly vintage mystery highlights. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
      
      {/* Footer will be rendered by your layout component */}
    </div>
  );
}

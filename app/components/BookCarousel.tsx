import { Link } from "@remix-run/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define book interface for type safety
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  path: string;
}

interface BookCarouselProps {
  books: Book[];
}

export default function BookCarousel({ books }: BookCarouselProps) {
  return (
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
              {books.map((book) => (
                <Link 
                  key={book.id} 
                  to={book.path} 
                  className="flex-shrink-0"
                >
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="h-[200px] md:h-[300px] lg:h-[400px] w-auto"
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
  );
} 
import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Book, BookOpen, BookText, Archive, Package, BookOpen as BookReadIcon, Eye } from 'lucide-react';
import { Product } from "~/lib/types";
import { cn } from "~/lib/utils";
import { ProductQuickLook } from "./ProductQuickLook";

interface ProductCardProps {
  product: Product;
  className?: string;
}

// Helper to get the appropriate icon based on product type
export const getBookTypeIcon = (product: Product) => {
  // Use tags to determine the book type
  if (product.tags?.some(tag => tag.includes('print_novel'))) {
    return Book;
  } else if (product.tags?.some(tag => tag.includes('print_a5'))) {
    return BookOpen;
  } else if (product.tags?.some(tag => tag.includes('print_large'))) {
    return BookText;
  } else if (product.collection === 'vintage_crime') {
    return Archive;
  } else if (product.tags?.some(tag => tag.includes('bundle'))) {
    return Package;
  }
  
  // Default to Book
  return Book;
};

// Helper to get a readable label for the book type
export const getBookTypeLabel = (product: Product) => {
  if (product.tags?.some(tag => tag.includes('print_novel'))) {
    return "Novel";
  } else if (product.tags?.some(tag => tag.includes('print_a5'))) {
    return "Novella";
  } else if (product.tags?.some(tag => tag.includes('print_large'))) {
    return "Novelette";
  } else if (product.collection === 'vintage_crime') {
    return "Collection";
  } else if (product.tags?.some(tag => tag.includes('bundle'))) {
    return "Bundle";
  }
  
  return "Book";
};

// Helper to display year badge based on publication period
const getYearBadge = (product: Product) => {
  if (product.publication_year) {
    return `${product.publication_year}`;
  }
  
  // Use tags to determine the period
  if (product.tags?.includes('pre_1900')) {
    return "Pre-1900";
  } else if (product.tags?.includes('victorian')) {
    return "1900-1910";
  } else if (product.tags?.includes('edwardian')) {
    return "1910-1920";
  } else if (product.tags?.includes('roaring_20s')) {
    return "1920-1930";
  }
  
  return null;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const [isQuickLookOpen, setIsQuickLookOpen] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const BookTypeIcon = getBookTypeIcon(product);
  const bookType = getBookTypeLabel(product);
  const yearBadge = getYearBadge(product);
  
  // Get price with currency formatting
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.price.currency_code,
  }).format(product.price.amount);
  
  // Build link URLs based on product type
  const productUrl = `/${bookType.toLowerCase()}s/${product.handle}`;
  const readUrl = `/novels/read/${product.handle}`;
  
  // Common button style class
  const buttonClass = "min-w-[110px] h-10 inline-flex items-center justify-center rounded-md text-center text-sm font-medium focus:outline-none";
  
  // Open quick look modal
  const openQuickLook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickLookOpen(true);
  };
  
  // Handle mouse enter to trigger quick look after delay
  const handleMouseEnter = () => {
    // Only apply hover behavior on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      // Clear any existing timer to avoid duplicate timers
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      
      // Set timer to show quick look after hovering for a while
      hoverTimerRef.current = setTimeout(() => {
        setIsQuickLookOpen(true);
      }, 800); // 800ms delay
    }
  };
  
  // Handle mouse leave to clear timer
  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };
  
  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cardRef}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Book type badge */}
        <div className="absolute left-2 top-2 z-10 flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-800 shadow-sm">
          <BookTypeIcon className="mr-1 h-3.5 w-3.5" />
          <span>{bookType}</span>
        </div>
        
        {/* Year badge (if available) */}
        {yearBadge && (
          <div className="absolute right-2 top-2 z-10 flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 shadow-sm">
            {yearBadge}
          </div>
        )}
        
        {/* Cover image */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
          <Link 
            to={productUrl}
            className="block h-full w-full"
          >
            <img
              src={product.thumbnail}
              alt={`Cover of ${product.title}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          
          {/* Quick Look button - desktop hover */}
          <button
            onClick={openQuickLook}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity md:flex sm:hidden hidden"
            aria-label="Quick look"
          >
            <div className="bg-white/80 rounded-full p-3 shadow-md hover:bg-white">
              <Eye className="h-6 w-6 text-gray-900" />
            </div>
          </button>
          
          {/* Quick Look button - touch devices */}
          <button
            onClick={openQuickLook}
            className="absolute bottom-3 right-3 z-20 md:hidden bg-white/90 rounded-full p-2 shadow-md hover:bg-white"
            aria-label="Quick look"
          >
            <Eye className="h-5 w-5 text-gray-900" />
          </button>
        </div>
        
        {/* Book info */}
        <div className="flex flex-1 flex-col p-4">
          <Link to={productUrl} className="mb-1">
            <h3 className="font-serif text-lg font-semibold text-black hover:text-blood-red">
              {product.title}
            </h3>
          </Link>
          
          {product.author && (
            <p className="mb-2 text-sm text-gray-600">
              by {product.author}
            </p>
          )}
          
          {/* Price and buttons */}
          <div className="mt-auto">
            <div className="mb-4 text-base font-medium text-black">
              {formattedPrice}
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Buy button */}
              <Link 
                to={productUrl} 
                className={`${buttonClass} border border-blood-red bg-blood-red text-white hover:bg-blood-red/90`}
              >
                BUY
              </Link>
              
              {/* Read Free button */}
              <Link 
                to={readUrl}
                className={`${buttonClass} border border-blood-red bg-white text-blood-red hover:bg-blood-red/5`}
              >
                <BookReadIcon className="mr-1 h-4 w-4 text-blood-red" />
                READ FREE
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Look Modal */}
      <ProductQuickLook 
        product={product}
        isOpen={isQuickLookOpen}
        onClose={() => setIsQuickLookOpen(false)}
      />
    </>
  );
} 
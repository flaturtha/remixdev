import { Link } from "@remix-run/react";
import { Book, BookOpen, BookText, Archive, Package, BookOpen as BookReadIcon } from 'lucide-react';
import { Product } from "~/lib/types";
import { cn } from "~/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

// Helper function to get the book type icon
const getBookTypeIcon = (product: Product) => {
  if (product.tags?.includes('print_novel')) return Book;
  if (product.tags?.includes('print_a5')) return BookOpen;
  if (product.tags?.includes('print_large')) return BookText;
  if (product.collection === 'vintage_crime') return Archive;
  if (product.tags?.includes('bundle')) return Package;
  return Book; // Default to book
};

// Helper function to get book type label
const getBookTypeLabel = (product: Product): string => {
  if (product.tags?.includes('print_novel')) return 'Novel';
  if (product.tags?.includes('print_a5')) return 'Novella';
  if (product.tags?.includes('print_large')) return 'Novelette';
  if (product.collection === 'vintage_crime') return 'Collection';
  if (product.tags?.includes('bundle')) return 'Bundle';
  return 'Book';
};

// Helper to get the year badge
const getYearBadge = (product: Product) => {
  return product.publication_year ? `${product.publication_year}` : null;
};

export function ProductCard({ product, className }: ProductCardProps) {
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
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950",
        className
      )}
    >
      {/* Book type badge */}
      <div className="absolute left-2 top-2 z-10 flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-800 shadow-sm dark:bg-gray-800/90 dark:text-gray-200">
        <BookTypeIcon className="mr-1 h-3.5 w-3.5" />
        <span>{bookType}</span>
      </div>
      
      {/* Year badge (if available) */}
      {yearBadge && (
        <div className="absolute right-2 top-2 z-10 flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 shadow-sm dark:bg-amber-900/60 dark:text-amber-200">
          {yearBadge}
        </div>
      )}
      
      {/* Cover image */}
      <Link 
        to={productUrl}
        className="block relative aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800"
      >
        <img
          src={product.thumbnail}
          alt={`Cover of ${product.title}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
      
      {/* Book info */}
      <div className="flex flex-1 flex-col p-4">
        <Link to={productUrl} className="mb-1">
          <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">
            {product.title}
          </h3>
        </Link>
        
        {product.author && (
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            by {product.author}
          </p>
        )}
        
        {/* Price and buttons */}
        <div className="mt-auto">
          <div className="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
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
  );
} 
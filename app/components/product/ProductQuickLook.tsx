import { useEffect, useState, useRef, FC } from "react";
import { Link } from "@remix-run/react";
import { X, BookOpen as BookReadIcon, Star } from "lucide-react";
import { Product } from "~/lib/types";
import { getBookTypeIcon, getBookTypeLabel } from "./ProductCard";

interface ProductQuickLookProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

// Generate a longer lorem ipsum description for the quick look view
const generateLongDescription = (product: Product): string[] => {
  return [
    `${product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc ultricies nunc, quis ultricies nisl nisl quis nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc ultricies nunc, quis ultricies nisl nisl quis nisl.`,
    
    `Nullam euismod, diam quis aliquam ultricies, nisl nunc ultricies nunc, quis ultricies nisl nisl quis nisl. Vivamus vel tincidunt quam. Donec hendrerit, nulla sed tempor venenatis, quam ante convallis nisl, at efficitur nunc mauris vel purus. Suspendisse potenti. Donec vel sem enim. Nulla facilisi. Cras porta malesuada odio, id tempor justo tristique at. In hac habitasse platea dictumst. Cras sit amet tincidunt lorem, in suscipit diam. Morbi a dui nibh. Phasellus scelerisque sodales lacus id porttitor.`,
    
    `Phasellus feugiat erat eu ullamcorper ultricies. Praesent efficitur dapibus aliquam. Nulla facilisi. Nulla facilisis tellus a purus ultricies, sed placerat velit tincidunt. Donec vitae porttitor odio. Nulla dapibus dolor at ipsum elementum, ut malesuada magna tempus. Pellentesque et tempus nisi, at hendrerit quam. Nullam sollicitudin mauris at lectus condimentum tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Praesent pellentesque, erat in volutpat scelerisque, metus urna lacinia massa, nec lacinia mauris nisl a eros.`
  ];
};

export const ProductQuickLook: FC<ProductQuickLookProps> = ({ product, isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const BookTypeIcon = getBookTypeIcon(product);
  const bookType = getBookTypeLabel(product);
  const longDescription = generateLongDescription(product);
  
  // Format price
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.price.currency_code,
  }).format(product.price.amount);
  
  // Build URLs
  const productUrl = `/${bookType.toLowerCase()}s/${product.handle}`;
  const readUrl = `/novels/read/${product.handle}`;
  
  // Animation timing
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  if (!mounted && !isOpen) return null;
  
  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (overlayRef.current === e.target) {
      onClose();
    }
  };
  
  return (
    <div 
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOverlayClick}
    >
      <div 
        className={`relative w-[90%] max-w-5xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onMouseLeave={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 text-gray-700 hover:bg-gray-100"
          aria-label="Close quick look"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Book Cover */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100 rounded-lg">
            <img
              src={product.thumbnail}
              alt={`Cover of ${product.title}`}
              className="h-full w-full object-cover"
            />
            
            {/* Book type badge */}
            <div className="absolute left-4 top-4 z-10 flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-800 shadow-sm">
              <BookTypeIcon className="mr-1 h-3.5 w-3.5" />
              <span>{bookType}</span>
            </div>
            
            {/* Year badge */}
            {product.publication_year && (
              <div className="absolute right-4 top-4 z-10 flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 shadow-sm">
                {product.publication_year}
              </div>
            )}
          </div>
          
          {/* Book Details */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-black">
                {product.title}
              </h2>
              {product.author && (
                <p className="mt-1 text-lg text-gray-700">
                  by {product.author}
                </p>
              )}
            </div>
            
            {/* Rating (placeholder) */}
            <div className="flex items-center mb-4">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= 4 ? 'fill-current' : ''}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                (24 reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <p className="text-xl font-medium text-black">
                {formattedPrice}
              </p>
              {product.editions && product.editions.length > 1 && (
                <p className="text-sm text-gray-600 mt-1">
                  Available in {product.editions.length} editions
                </p>
              )}
            </div>
            
            {/* Long description - in a scrollable area */}
            <div className="mb-6 overflow-y-auto pr-2 max-h-[250px] space-y-4">
              {longDescription.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 text-sm">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Action buttons */}
            <div className="mt-auto flex flex-wrap gap-4">
              <Link
                to={productUrl}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blood-red hover:bg-blood-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blood-red"
              >
                View Full Details
              </Link>
              <Link
                to={readUrl}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-blood-red rounded-md text-base font-medium text-blood-red bg-white hover:bg-blood-red/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blood-red"
              >
                <BookReadIcon className="mr-2 h-5 w-5" />
                Read Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
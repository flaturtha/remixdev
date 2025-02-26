import { useState } from 'react';
import { Product } from '~/lib/types';
import { Search } from 'lucide-react';

interface ProductImageGalleryProps {
  product: Product;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Get all images or use thumbnail if no images
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.thumbnail];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={images[selectedImage]}
          alt={product.title}
          style={{
            viewTransitionName: 'product-thumbnail',
          }}
          className="h-full w-full object-contain object-center"
        />
        <div className="absolute right-2 top-2 flex items-center justify-center rounded-xl bg-gray-800 p-2 opacity-0 transition-all hover:opacity-75 group-hover:opacity-50">
          <Search className="h-6 w-6 text-white" />
        </div>
      </div>
      
      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-md ${
                selectedImage === index ? 'ring-2 ring-black' : ''
              }`}
            >
              <img
                src={image}
                alt={`${product.title} - Image ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Lightbox - simplified version */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white"
              onClick={() => setLightboxOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
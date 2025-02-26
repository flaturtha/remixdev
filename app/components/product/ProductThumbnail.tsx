import { Product } from "~/lib/types";

interface ProductThumbnailProps {
  product: Product;
  isTransitioning?: boolean;
  className?: string;
}

export function ProductThumbnail({ 
  product, 
  isTransitioning = false,
  className = "" 
}: ProductThumbnailProps) {
  // Get the main image and hover image
  const thumbnailImage = product.thumbnail;
  const hoverImage = product.images && product.images[1];

  // Get edition types for badges
  const editions = product.tags?.filter(tag => 
    ['ebook', 'print_novel', 'print_a5', 'print_large', 'audiobook', 'free_online'].includes(tag)
  ) || [];

  return (
    <div className="relative">
      <figure
        className={`product-thumbnail aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg border border-black border-opacity-5 ${className}`}
        style={{
          viewTransitionName: isTransitioning ? 'product-thumbnail' : undefined,
        }}
      >
        {hoverImage && (
          <img
            loading="lazy"
            src={hoverImage}
            alt={product.title}
            className="h-full w-full object-cover object-center opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
          />
        )}
        <img
          loading="lazy"
          src={thumbnailImage}
          alt={product.title}
          className={`h-full w-full object-cover object-center transition-all duration-300 ${
            hoverImage ? 'group-hover:opacity-0' : 'group-hover:opacity-75'
          }`}
        />
      </figure>
      
      {/* Edition badges */}
      {editions.length > 0 && (
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {editions.includes('ebook') && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">eBook</span>
          )}
          {editions.includes('print_novel') && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Novel</span>
          )}
          {editions.includes('print_a5') && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">A5</span>
          )}
          {editions.includes('print_large') && (
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">Large</span>
          )}
          {editions.includes('audiobook') && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">Audio</span>
          )}
          {editions.includes('free_online') && (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">Free</span>
          )}
        </div>
      )}
      
      {/* Publication year badge */}
      {product.publication_year && (
        <div className="absolute top-2 right-2">
          <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded">
            {product.publication_year}
          </span>
        </div>
      )}

      {/* Collection badge */}
      {product.collection && (
        <div className="absolute top-2 left-2">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">
            {getCollectionName(product.collection)}
          </span>
        </div>
      )}
    </div>
  );
}

function getCollectionName(collectionId: string): string {
  const collections = {
    'vintage_crime': 'Vintage Crime',
    'bradys': 'Brady\'s',
    'sherlock': 'Sherlock',
    'agatha': 'Christie',
    'poe': 'Poe'
  };
  
  return collections[collectionId as keyof typeof collections] || collectionId;
} 
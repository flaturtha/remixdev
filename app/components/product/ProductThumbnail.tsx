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

  return (
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
  );
} 
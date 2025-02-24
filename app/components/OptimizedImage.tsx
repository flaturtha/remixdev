interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  width,
  height,
  fallbackSrc = "https://placehold.co/600x400/f8f5f0/333333?text=Image+Not+Found"
}: OptimizedImageProps) {
  // Debug log
  console.log("OptimizedImage rendering with src:", src);
  
  // Get file extension
  const extension = src.split('.').pop()?.toLowerCase();
  
  // Base path without extension
  const basePath = src.substring(0, src.lastIndexOf('.'));
  
  // Check if we have WebP version
  const webpSrc = `${basePath}.webp`;
  
  // Check if we have AVIF version
  const avifSrc = `${basePath}.avif`;
  
  // Handle image loading error
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${src}`);
    e.currentTarget.src = fallbackSrc;
  };
  
  return (
    <picture>
      {/* AVIF format for browsers that support it */}
      <source srcSet={avifSrc} type="image/avif" />
      
      {/* WebP format for browsers that support it */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Original format as fallback */}
      <img
        src={src}
        alt={alt}
        className={`${className} dark-mode-image`}
        sizes={sizes}
        width={width}
        height={height}
        loading="lazy"
        onError={handleError}
      />
    </picture>
  );
} 
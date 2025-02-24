interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function SimpleImage({
  src,
  alt,
  className = "",
  width,
  height
}: SimpleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      onError={(e) => {
        console.error(`Failed to load image: ${src}`);
        e.currentTarget.src = "https://placehold.co/600x400/f8f5f0/333333?text=Image+Not+Found";
      }}
    />
  );
} 
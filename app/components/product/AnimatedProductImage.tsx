import React from "react";

interface AnimatedProductImageProps {
  src: string;
  alt: string;
  className?: string;
  isDetail?: boolean;
}

export function AnimatedProductImage({ 
  src, 
  alt, 
  className = "",
  isDetail = false
}: AnimatedProductImageProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        style={{
          viewTransitionName: isDetail ? 'product-thumbnail' : undefined,
        }}
        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
} 
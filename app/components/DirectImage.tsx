import React from 'react';

interface DirectImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function DirectImage({ src, alt, className = "" }: DirectImageProps) {
  // Log the image path for debugging
  console.log("DirectImage rendering with src:", src);
  
  return (
    <>
      {/* Use dangerouslySetInnerHTML to ensure no React processing */}
      <div 
        dangerouslySetInnerHTML={{
          __html: `<img 
            src="${src}" 
            alt="${alt}" 
            class="${className}"
            onerror="this.onerror=null; this.src='https://placehold.co/600x400/f8f5f0/333333?text=Image+Not+Found'; console.error('Failed to load image: ${src}');"
          />`
        }}
      />
      
      {/* Fallback placeholder in case the above fails */}
      <noscript>
        <div style={{ 
          width: '100%', 
          height: '200px', 
          backgroundColor: '#f8f5f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontWeight: 'bold'
        }}>
          {alt || "Image"}
        </div>
      </noscript>
    </>
  );
} 
interface FullWidthImageProps {
  src: string;
  alt: string;
  height?: string;
}

export default function FullWidthImage({ 
  src, 
  alt,
  height = "500px"
}: FullWidthImageProps) {
  return (
    <section className="w-full py-4">
      <div className="max-w-7xl mx-auto rounded-lg overflow-hidden">
        <img 
          src={src}
          alt={alt}
          className="w-full h-auto md:object-cover"
          style={{ maxHeight: height }}
        />
      </div>
    </section>
  );
} 
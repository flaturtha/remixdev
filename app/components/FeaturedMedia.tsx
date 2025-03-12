interface FeaturedMediaProps {
  imageSrc: string;
  imageAlt: string;
  heading1: string;
  heading2: string;
  description: string;
}

export default function FeaturedMedia({
  imageSrc,
  imageAlt,
  heading1,
  heading2,
  description
}: FeaturedMediaProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <img 
              src={imageSrc} 
              alt={imageAlt}
              className="max-w-[250px] mx-auto shadow-xl"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-5xl font-serif italic text-gray-600 mb-2">{heading1}</h2>
            <h3 className="text-4xl font-light text-gray-900 mb-6">{heading2}</h3>
            <p className="text-lg text-gray-700 max-w-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
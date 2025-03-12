import { Link } from "@remix-run/react";

interface PreservationHeroProps {
  backgroundImage: string;
  tagline: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function PreservationHero({
  backgroundImage,
  tagline,
  title,
  description,
  ctaText,
  ctaLink
}: PreservationHeroProps) {
  return (
    <section 
      className="w-screen relative fade-in bg-cover bg-center py-24 xs:py-32 md:py-40 pb-64 md:pb-64"
      style={{ 
        backgroundImage: `url("${backgroundImage}")`,
        margin: '0 -16px',
        width: '100vw',
        maxWidth: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-white text-sm md:text-base uppercase tracking-wider mb-2">{tagline}</p>
        <h1 className="text-6xl md:text-8xl font-serif text-white mb-6">{title}</h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
          {description}
        </p>
        <Link 
          to={ctaLink} 
          className="mt-8 inline-block bg-white text-gray-900 px-6 py-3 rounded hover:bg-gray-200 transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
} 
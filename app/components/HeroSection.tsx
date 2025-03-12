import { Link } from "@remix-run/react";

export default function HeroSection() {
  return (
    <section 
      className="w-screen relative fade-in bg-cover bg-center py-16 xs:py-20 md:py-32"
      style={{ 
        backgroundImage: 'url("/images/old-cap-collier.png")',
        margin: '0 -16px',
        width: '100vw',
        maxWidth: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h3 className="text-center font-bold text-2xl xs:text-3xl uppercase tracking-wider text-[#8b0000] mb-8 md:hidden">Featured Book of the Day</h3>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Book Cover */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <img 
              src="/images/ebook-cover.png" 
              alt="Cover of Old Broadbrim: Into the Heart of Australia"
              className="w-64 h-auto shadow-2xl rounded"
            />
          </div>
          
          {/* Book Info & CTAs */}
          <div className="w-full md:w-2/3 text-center md:text-left backdrop-blur-sm bg-white/30 p-6 rounded-lg shadow-sm">
            <div className="mb-2 text-[#8b0000] hidden md:block">FEATURED BOOK OF THE DAY</div>
            <h1 className="font-breamcatcher text-4xl xs:text-5xl md:text-6xl font-bold mb-2 text-gray-900 tracking-wider">INTO THE HEART OF AUSTRALIA</h1>
            <p className="text-xl mb-4 text-gray-800">by The Author of Old Broadbrim</p>
            <p className="text-lg xs:text-xl mb-8 text-gray-700">
              A wealthy recluse's chilling bargain leads Old Broadbrim into a web of shadows, betrayal, and murder, spanning continents and testing his resolve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/library/into-the-heart-of-australia" 
                className="inline-block bg-[#8b0000] text-white px-8 py-3 rounded-md hover:bg-[#6d0000] transition-colors hover-lift"
              >
                Read Free
              </Link>
              <Link 
                to="/shop/library/into-the-heart-of-australia" 
                className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Buy & Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
import { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { useSearchParams } from "@remix-run/react";
import Footer from "../components/Footer";
import { HEADLINES } from "~/config/headlines";
import { trackFBEvent } from "~/components/FacebookPixel";
import CookieConsent from "~/components/CookieConsent";
import LoginButton from "~/components/LoginButton";
import React from "react";
import LaunchForm2 from "~/components/LaunchForm2";

export const meta: MetaFunction = () => {
  return [
    { title: "Tales of Murder Press - Classic Crime Fiction" },
    { name: "description", content: "Rediscover the lost classics of crime fiction with Tales of Murder Press." },
  ];
};

// Add custom styles for tablet view
const customStyles = `
  /* Mobile first - below 460px */
  @media (max-width: 459px) {
    .hero-container {
      height: auto !important;
      min-height: fit-content !important;
      padding-bottom: 120% !important;
    }
    .hero-container.taller {
      padding-bottom: 130% !important;
    }
    .hero-container.extra-tall {
      padding-bottom: 140% !important;
    }
    /* Only hide bullets for specific variants */
    .variant-32 .hero-text,
    .variant-34 .hero-text,
    .variant-36 .hero-text,
    .variant-40 .hero-text,
    .variant-44 .hero-text {
      display: none !important;
    }
    .hero-title {
      font-size: 2rem !important;
      line-height: 1.2 !important;
    }
    .hero-text {
      font-size: 0.875rem !important;
      line-height: 1.4 !important;
    }
    .hero-bullet {
      font-size: 0.875rem !important;
    }
  }

  /* 460px to 768px */
  @media (min-width: 460px) and (max-width: 768px) {
    .hero-container {
      height: auto !important;
      min-height: fit-content !important;
      padding-bottom: 110% !important;
    }
    .hero-container.taller {
      padding-bottom: 140% !important;
    }
    .hero-container.extra-tall {
      padding-bottom: 160% !important;
    }
    .hero-text {
      font-size: 1.125rem !important;
      line-height: 1.4 !important;
    }
    .hero-title {
      font-size: clamp(2.5rem, 8vw, 3.75rem) !important;  /* ~60px at 768px */
      line-height: 1.1 !important;
    }
    .hero-bullet {
      font-size: 1.125rem !important;
    }
    .vintage-library-box {
      font-size: 1.25rem !important;
    }
  }

  /* 769px to 1159px */
  @media (min-width: 769px) and (max-width: 1159px) {
    .hero-container {
      height: auto !important;
      min-height: fit-content !important;
      padding-bottom: 85% !important;
    }
    .hero-container.taller {
      padding-bottom: 90% !important;
    }
    .hero-container.extra-tall {
      padding-bottom: 95% !important;
    }
    .hero-text {
      font-size: min(2vw, 1.5rem) !important;
      line-height: 1.3 !important;
    }
    .hero-title {
      font-size: 2.5rem !important;
      line-height: 1.1 !important;
    }
    .hero-bullet {
      font-size: min(1.8vw, 1.4rem) !important;
    }
  }

  /* 1160px and above */
  @media (min-width: 1160px) {
    .hero-container {
      height: auto !important;
      min-height: fit-content !important;
      padding-bottom: 75% !important;  /* Taller to prevent bullet cutoff */
    }
    .hero-container.taller {
      padding-bottom: 80% !important;
    }
    .hero-container.extra-tall {
      padding-bottom: 85% !important;
    }
  }
`;

function HighlightedText({ 
  text, 
  highlights, 
  variant 
}: { 
  text: string, 
  highlights: string[], 
  variant: string 
}) {
  if (!highlights || highlights.length === 0) return <span className="uppercase font-light lg:font-extralight">{text}</span>;
  
  const pattern = new RegExp(
    `(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  );
  
  const parts = text.split(pattern);
  
  return (
    <>
      {parts.map((part, index) => {
        const isHighlighted = highlights.some(h => 
          h.toLowerCase() === part.toLowerCase()
        );
        
        if (isHighlighted) {
          const style = HEADLINES[variant as keyof typeof HEADLINES]?.styles?.[part];
          if (style === "italic") {
            return <span key={index} className="font-light lg:font-extralight italic">{part}</span>;
          } else if (style === "bold") {
            return <span key={index} className="font-[1000] tracking-wide">{part}</span>;
          }
          return <span key={index} className="font-[1000] tracking-wide">{part}</span>;
        }
        
        return (
          <span key={index} className="font-light lg:font-extralight">
            {part}
          </span>
        );
      })}
    </>
  );
}

export default function ComingSoon2() {
  const [searchParams] = useSearchParams();
  const variant = searchParams.get('utm_source') || '1';
  const content = HEADLINES[variant as keyof typeof HEADLINES] || HEADLINES['1'];

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Page view tracking
  useEffect(() => {
    if (window._learnq) {
      window._learnq.push(['track', 'Viewed Landing Page', {
        'Landing Page Variant': variant,
        'Page URL': window.location.href,
        'Page Title': document.title,
        'UTM Source': variant,
        'UTM Medium': searchParams.get('utm_medium') || '',
        'UTM Campaign': searchParams.get('utm_campaign') || '',
        'UTM Term': searchParams.get('utm_term') || '',
        'Timestamp': new Date().toISOString()
      }]);
    }

    // Also push to dataLayer for GTM
    window.dataLayer?.push({
      event: 'pageView',
      pageVariant: variant,
      utmSource: variant,
      utmMedium: searchParams.get('utm_medium') || '',
      utmCampaign: searchParams.get('utm_campaign') || '',
      utmTerm: searchParams.get('utm_term') || ''
    });
  }, [variant, searchParams]);

  // Scroll depth tracking
  useEffect(() => {
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll >= 50 && !sessionStorage.getItem('scrolled50')) {
          sessionStorage.setItem('scrolled50', 'true');
          window._learnq?.push(['track', 'Scrolled 50%', {
            'Landing Page Variant': variant,
            'Page URL': window.location.href,
            'UTM Source': variant,
            'UTM Medium': searchParams.get('utm_medium') || '',
            'UTM Campaign': searchParams.get('utm_campaign') || '',
            'UTM Term': searchParams.get('utm_term') || '',
            'Timestamp': new Date().toISOString()
          }]);
        }
        if (maxScroll >= 90 && !sessionStorage.getItem('scrolled90')) {
          sessionStorage.setItem('scrolled90', 'true');
          window._learnq?.push(['track', 'Scrolled 90%', {
            'Landing Page Variant': variant,
            'Page URL': window.location.href,
            'UTM Source': variant,
            'UTM Medium': searchParams.get('utm_medium') || '',
            'UTM Campaign': searchParams.get('utm_campaign') || '',
            'UTM Term': searchParams.get('utm_term') || '',
            'Timestamp': new Date().toISOString()
          }]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant, searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <LoginButton />
      <main className="flex-grow">
        <div className="landing-page w-full bg-[#f7f3e9]">
          <div className={`relative hero-container variant-${variant} ${
            Number(variant) === 32 ? 'extra-tall' :
            [44, 40, 34, 36].includes(Number(variant)) ? 'taller' : ''
          }`} style={{ paddingBottom: '66.67%' }}>
            <div className="absolute inset-0 bg-black/45 z-10"></div>
            <img
              src={content.image || "/images/old-cap-collier.png"}
              alt="Product background"
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ 
                objectPosition: typeof content.imagePosition === 'object' 
                  ? content.imagePosition.mobile 
                  : content.imagePosition || 'center 20%'
              }}
              data-tablet-adjust="true"
            />
            <div className="absolute inset-0 flex flex-col justify-start items-center text-center z-20 px-4 pt-12 sm:pt-16 md:pt-16 lg:pt-24">
              <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter text-[#f7f3e9] uppercase max-w-[18ch] mx-auto leading-tight sm:leading-snug md:leading-normal">
                <HighlightedText 
                  text={content.title} 
                  highlights={content.highlights || []} 
                  variant={variant}
                />
              </h1>
              
              <div className="w-[90%] sm:w-auto max-w-2xl mt-3 mb-2 sm:mt-4 sm:mb-4 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8">
                <p className="vintage-library-box text-gray-900 font-bold text-sm sm:text-base md:text-lg lg:text-xl 
                              bg-[#f7f3e9]/95 backdrop-blur-sm 
                              px-4 py-2 sm:px-6 sm:py-3 text-center inline-block mx-auto
                              border-l-4 border-r-4 border-gray-900/20
                              shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                              transition-all duration-300 ease-in-out
                              hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]">
                  A Vintage Mystery Library
                </p>
              </div>

              <div className="hero-text text-[#f7f3e9] text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mt-2 sm:mt-4 md:mt-0">
                <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                  <li className="flex items-center gap-1 sm:gap-2 justify-center">
                    <span className="hero-bullet text-[#f7f3e9] text-sm sm:text-base md:text-lg lg:text-xl">✓</span>
                    <span className="hero-bullet">Get exclusive access to rare mysteries</span>
                  </li>
                  <li className="flex items-center gap-1 sm:gap-2 justify-center">
                    <span className="hero-bullet text-[#f7f3e9] text-xs sm:text-sm md:text-base lg:text-lg">✓</span>
                    <span className="hero-bullet">Full text online free</span>
                  </li>
                  <li className="flex items-center gap-1 sm:gap-2 justify-center">
                    <span className="hero-bullet text-[#f7f3e9] text-xs sm:text-sm md:text-base lg:text-lg">✓</span>
                    <span className="hero-bullet">eBook, print, audiobook editions available</span>
                  </li>
                </ul>
              </div>

              <div className={`mt-8 ${
                variant === '32' ? 'mb-4' : 'mb-2'
              } animate-bounce cursor-pointer hidden md:block`} onClick={handleScrollToBottom}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" stroke="#f7f3e9" strokeWidth="2"/>
                  <path d="M7 10L12 15L17 10" stroke="#f7f3e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8 sm:space-y-10">
            <div className="space-y-4 sm:space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src="/images/key3.svg"
                  alt="Vintage key"
                  className="h-12 sm:h-16 w-auto transform -rotate-90"
                />
              </div>
              <h2 className="space-y-2 sm:space-y-3">
                <div className="text-2xl sm:text-3xl font-bold text-[#f7f3e9] bg-gray-900 py-2 px-4 inline-block shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition-shadow duration-300">
                  UNLOCK YOUR INVITATION
                </div>
                <div className="text-3xl sm:text-4xl font-semibold text-gray-900">
                  +
                </div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  CLAIM YOUR FREE VINTAGE MYSTERY NOVEL <span className="italic">(ebook edition)</span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 mt-4 sm:mt-6">
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    {/* First Row - 3 books */}
                    <div className="grid grid-cols-3 items-start justify-items-center gap-4">
                      {[
                        { title: 'BAT WING', cover: '/images/book-covers/bat-wing_cover.png' },
                        { title: 'INTO THE HEART OF AUSTRALIA', cover: '/images/book-covers/into-the-heart-of-australia_cover.png' },
                        { title: 'THE BRADYS AND THE CHINESE IDOL', cover: '/images/book-covers/bradys-and-the-chinese-idol_cover.png' }
                      ].map((book, index) => (
                        <button 
                          key={index}
                          onClick={handleScrollToBottom}
                          className="group flex flex-col items-center gap-2 hover:text-gray-900 transition-all duration-200 cursor-pointer w-[70px]"
                        >
                          <div className="aspect-[2/3] w-full relative">
                            <img 
                              src={book.cover} 
                              alt={`Cover of ${book.title}`}
                              className="absolute inset-0 w-full h-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-200"
                            />
                          </div>
                          <span className="text-center italic text-[0.7em] leading-tight">
                            {book.title}
                          </span>
                        </button>
                      ))}
                    </div>
                    {/* Second Row - 2 books */}
                    <div className="grid grid-cols-2 items-start justify-items-center gap-4 mt-4">
                      {[
                        { title: 'THE DEAD SECRET', cover: '/images/book-covers/dead-secret_cover.png' },
                        { title: 'THE EXPRESSMAN AND THE DETECTIVE', cover: '/images/book-covers/expressman-and-the-detective_cover.png' }
                      ].map((book, index) => (
                        <button 
                          key={index}
                          onClick={handleScrollToBottom}
                          className="group flex flex-col items-center gap-2 hover:text-gray-900 transition-all duration-200 cursor-pointer w-[70px]"
                        >
                          <div className="aspect-[2/3] w-full relative">
                            <img 
                              src={book.cover} 
                              alt={`Cover of ${book.title}`}
                              className="absolute inset-0 w-full h-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-200"
                            />
                          </div>
                          <span className="text-center italic text-[0.7em] leading-tight">
                            {book.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-start justify-center flex-wrap gap-6">
                    {[
                      { title: 'BAT WING', cover: '/images/book-covers/bat-wing_cover.png' },
                      { title: 'INTO THE HEART OF AUSTRALIA', cover: '/images/book-covers/into-the-heart-of-australia_cover.png' },
                      { title: 'THE BRADYS AND THE CHINESE IDOL', cover: '/images/book-covers/bradys-and-the-chinese-idol_cover.png' },
                      { title: 'THE DEAD SECRET', cover: '/images/book-covers/dead-secret_cover.png' },
                      { title: 'THE EXPRESSMAN AND THE DETECTIVE', cover: '/images/book-covers/expressman-and-the-detective_cover.png' }
                    ].map((book, index, array) => (
                      <React.Fragment key={index}>
                        <button 
                          onClick={handleScrollToBottom}
                          className="group flex flex-col items-center gap-2 hover:text-gray-900 transition-all duration-200 cursor-pointer w-[85px]"
                        >
                          <div className="aspect-[2/3] w-full relative">
                            <img 
                              src={book.cover} 
                              alt={`Cover of ${book.title}`}
                              className="absolute inset-0 w-full h-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-200"
                            />
                          </div>
                          <span className="text-center italic text-xs leading-tight">
                            {book.title}
                          </span>
                        </button>
                        {index < array.length - 1 && (
                          <div className="flex items-center h-[105px]">
                            <span className="text-gray-400 font-light text-base">✦</span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </h2>
              <LaunchForm2 variant={variant} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
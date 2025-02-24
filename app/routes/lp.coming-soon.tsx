import { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import { useSearchParams } from "@remix-run/react";
import Footer from "../components/Footer";
import { HEADLINES } from "~/config/headlines";
import { trackFBEvent } from "~/components/FacebookPixel";
import LaunchForm from "~/components/LaunchForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Tales of Murder Press - Classic Crime Fiction" },
    { name: "description", content: "Rediscover the lost classics of crime fiction with Tales of Murder Press." },
  ];
};

export default function ComingSoon() {
  const [searchParams] = useSearchParams();
  const variant = searchParams.get('v') || '1';
  const content = HEADLINES[variant as keyof typeof HEADLINES] || HEADLINES['1'];

  useEffect(() => {
    // Track page view with UTM params
    const utmSource = searchParams.get('utm_source');
    const utmMedium = searchParams.get('utm_medium');
    const utmCampaign = searchParams.get('utm_campaign');

    trackFBEvent('LandingPageView', {
      variant,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign
    });
  }, [variant, searchParams]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=KChqVc';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 relative">
        <div 
          className="w-full min-h-screen bg-cover bg-no-repeat
                     bg-[position:60%_center] 
                     md:bg-[position:50%_center] 
                     lg:bg-[position:15%_center]
                     transition-[background-position] duration-700"
          style={{ 
            backgroundImage: 'url("/images/old-cap-collier.png")',
          }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent 
                          animate-gradient-shift pointer-events-none"></div>

          {/* Content container - Simplified structure */}
          <div className="absolute inset-0 flex flex-col justify-end pb-32">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex flex-col md:flex-row justify-end items-center gap-6 md:gap-8">
                {/* Content box - rest remains the same */}
                <div className="w-full md:w-7/12 lg:w-1/2 md:ml-auto lg:ml-32 space-y-6 md:space-y-8
                              bg-gray-900/50 backdrop-blur-md
                              border border-[#e8dab5]/20
                              rounded-lg p-8 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                  {/* Enhanced title styling with vintage corner */}
                  <div className="relative space-y-4">
                    {/* Corner decoration integrated with title */}
                    <div className="absolute -top-16 -left-16 w-32 h-32 opacity-40
                                    transform rotate-0 transition-all duration-700 ease-in-out">
                      <img 
                        src="/images/vintage-corner.png" 
                        alt="" 
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                    </div>
                    
                    <h1 className="font-bold text-center md:text-left 
                                   text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                   tracking-wide leading-tight text-[#e8dab5] 
                                   drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]
                                   [text-shadow:_2px_2px_12px_rgb(0_0_0_/_60%),_-1px_-1px_4px_rgb(0_0_0_/_40%)]
                                   relative z-10">
                      {content.title}
                    </h1>
                  </div>
                  
                  {/* Benefits list - removed some of the heavy shadows since we have the background now */}
                  <div className="mt-4 text-[#e8dab5] text-sm">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-[#e8dab5]">✓</span>
                        <span>Get exclusive access to rare mysteries</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e8dab5]">✓</span>
                        <span>Full text online free</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e8dab5]">✓</span>
                        <span>eBook, print, audiobook editions available</span>
                      </li>
                    </ul>
                  </div>

                  {/* Form container - simplified since we have the parent background */}
                  <div className="w-full mt-6">
                    <LaunchForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

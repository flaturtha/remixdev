import { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { HEADLINES } from "~/config/headlines";
import { trackFBEvent } from "~/components/FacebookPixel";
import ReferralProgress from "~/components/referral/ReferralProgress";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Thank You - Tales of Murder Press" },
    { name: "description", content: "Welcome to Tales of Murder Press" },
  ];
};

function HighlightedText({ text, highlights }: { text: string, highlights: string[] }) {
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
        
        return (
          <React.Fragment key={index}>
            {isHighlighted ? (
              <span className="font-[1000] tracking-wide">
                {part}
              </span>
            ) : (
              <span className="font-light lg:font-extralight">
                {part}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const variant = searchParams.get('utm_source') || '1';
  const content = HEADLINES[variant as keyof typeof HEADLINES] || HEADLINES['1'];

  useEffect(() => {
    window.dataLayer?.push({
      event: 'conversion',
      pageVariant: variant,
      utmSource: variant,
      utmMedium: searchParams.get('utm_medium') || '',
      utmCampaign: searchParams.get('utm_campaign') || '',
      utmTerm: searchParams.get('utm_term') || ''
    });

    if (window._learnq) {
      window._learnq.push(['track', 'Signup Complete', {
        'Landing Page Variant': variant,
        'Page URL': window.location.href,
        'UTM Source': variant,
        'UTM Medium': searchParams.get('utm_medium') || '',
        'UTM Campaign': searchParams.get('utm_campaign') || '',
        'UTM Term': searchParams.get('utm_term') || '',
        'Timestamp': new Date().toISOString()
      }]);
    }
  }, [variant, searchParams]);

  return (
    <div className="min-h-screen bg-[#f7f3e9]">
      <header className="bg-gray-900 text-[#f7f3e9] py-3">
        <div className="container mx-auto text-center">
          <h1 className="text-lg font-medium tracking-wide">
            THANKS FOR SIGNING UP — YOUR FREE MYSTERY IS ON ITS WAY
          </h1>
        </div>
      </header>

      <main className="bg-[#f7f3e9]">
        {/* Hero Section with Referral Overlay */}
        <div className="relative h-[70vh]">
          <img
            src="/images/old-cap-collier.png"
            alt="Victorian detective illustration"
            className="w-full h-full object-cover object-[15%_center]"
          />
          <div className="absolute inset-0 bg-black/25" />
          
          {/* Main Hero Text */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl md:text-6xl font-light tracking-tighter text-[#f7f3e9] max-w-2xl uppercase
                           drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                <HighlightedText 
                  text={content.title} 
                  highlights={content.highlights || []} 
                />
              </h2>
            </div>
          </div>

          {/* Referral Section - Desktop Overlay */}
          <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-1/2">
            <div className="max-w-xl mx-auto px-8 bg-[#f7f3e9]/95 p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                DON'T LEAVE YOUR FRIENDS BEHIND
              </h3>
              <h4 className="text-3xl font-bold text-gray-900 mb-6">
                INVITE FRIENDS & EARN REWARDS
              </h4>
              <p className="text-gray-600 mb-8">
                Share your unique link via email, Facebook, or Twitter and earn free books for each friend who signs up.
              </p>

              <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <input
                  type="text"
                  value="https://talesofmurder.com/ref/your-unique-code"
                  readOnly
                  className="w-full text-center p-2 bg-transparent border-none focus:outline-none"
                />
              </div>

              {/* Progress Indicators */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { count: 5, reward: 'Free eBook' },
                  { count: 15, reward: 'Print Edition' },
                  { count: 25, reward: 'Audiobook' },
                  { count: 50, reward: 'Collector Set' }
                ].map((level, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full border-4 border-gray-900 flex items-center justify-center">
                      <span className="text-lg font-bold">{level.count}</span>
                    </div>
                    <p className="text-xs font-medium">{level.reward}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Referral Section */}
        <div className="lg:hidden container mx-auto px-4 pt-16 pb-0">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              DON'T LEAVE YOUR FRIENDS BEHIND
            </h3>
            <h4 className="text-3xl font-bold text-gray-900 mb-6">
              INVITE FRIENDS & EARN REWARDS
            </h4>
            <p className="text-gray-600 mb-8">
              Share your unique link via email, Facebook, or Twitter and earn free books for each friend who signs up.
            </p>

            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
              <input
                type="text"
                value="https://talesofmurder.com/ref/your-unique-code"
                readOnly
                className="w-full text-center p-2 bg-transparent border-none focus:outline-none"
              />
            </div>

            {/* Progress Indicators */}
            <div className="grid grid-cols-4 gap-8 mb-12">
              {[
                { count: 5, reward: 'Free eBook' },
                { count: 15, reward: 'Print Edition' },
                { count: 25, reward: 'Audiobook' },
                { count: 50, reward: 'Collector Set' }
              ].map((level, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <span className="text-xl font-bold">{level.count}</span>
                  </div>
                  <p className="text-sm font-medium">{level.reward}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Referral Progress Section */}
        <ReferralProgress />
      </main>
    </div>
  );
}
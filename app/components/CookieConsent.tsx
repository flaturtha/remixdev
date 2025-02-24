import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = Cookies.get('cookieConsent') || localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
    Cookies.set('returningVisitor', 'true', { expires: 365 });
  };

  const handleDecline = () => {
    Cookies.set('cookieConsent', 'false', { expires: 365 });
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto max-w-sm z-50 
                    bg-gray-900/95 text-[#f7f3e9] 
                    rounded-lg shadow-lg backdrop-blur-sm
                    border border-[#f7f3e9]/10
                    mx-auto sm:mx-0 sm:right-4">
      <div className="p-4 space-y-3">
        <p className="text-sm">
          We use cookies to enhance your experience and remember your preferences.
        </p>
        <div className="flex gap-2 justify-end text-sm">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded hover:bg-[#f7f3e9]/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 bg-[#f7f3e9] text-gray-900 rounded 
                     hover:bg-[#f7f3e9]/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
} 
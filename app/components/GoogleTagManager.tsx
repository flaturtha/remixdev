import { useEffect, useRef } from 'react';
import { useSearchParams } from '@remix-run/react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface GoogleTagManagerProps {
  gtmId: string;
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  // PRODUCTION TODO: Uncomment this component's functionality before deploying to production
  // Currently disabled for development to prevent DOM-related errors
  
  /*
  const [searchParams] = useSearchParams();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const noscriptRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Initialize dataLayer with UTM parameters
    window.dataLayer = window.dataLayer || [];
    
    // Push initial UTM data
    window.dataLayer.push({
      event: 'utmParameters',
      utmContent: searchParams.get('utm_content') || '',
      utmSource: searchParams.get('utm_source') || '',
      utmMedium: searchParams.get('utm_medium') || '',
      utmCampaign: searchParams.get('utm_campaign') || '',
      utmTerm: searchParams.get('utm_term') || ''
    });

    // Load GTM script if it doesn't exist yet
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(script);
      scriptRef.current = script;
    }

    // Add noscript iframe if it doesn't exist yet
    if (!noscriptRef.current) {
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      
      // Only append if body exists and element doesn't already exist
      if (document.body && !document.querySelector('noscript iframe[src*="googletagmanager"]')) {
        document.body.insertBefore(noscript, document.body.firstChild);
        noscriptRef.current = noscript;
      }
    }

    // Cleanup function that safely removes elements
    return () => {
      // Only remove elements if they exist and are still in the DOM
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
      
      if (noscriptRef.current && document.body.contains(noscriptRef.current)) {
        document.body.removeChild(noscriptRef.current);
        noscriptRef.current = null;
      }
    };
  }, [gtmId, searchParams]);
  */

  return null;
} 
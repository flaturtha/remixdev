import { useEffect, useState } from 'react';

interface LaunchForm2Props {
  variant: string;
}

declare global {
  interface Window {
    klaviyo?: any[];
  }
}

export default function LaunchForm2({ variant }: LaunchForm2Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (window.klaviyo) {
      window.klaviyo.push(['attachToForms']);
    }
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto bg-[#f7f3e9] 
                    pt-4 pb-8 px-8">
      <div className="klaviyo-form-Ue3g2T"></div>
    </div>
  );
} 
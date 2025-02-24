import React from 'react';

export default function ReferralProgress() {
  return (
    <div className="max-w-4xl mx-auto pt-8">
      <h3 className="text-2xl font-bold text-[#8B0000] mb-12 tracking-wide">
        YOUR REFERRAL PROGRESS
      </h3>
      
      {/* Progress Bar */}
      <div className="relative mb-8">
        {/* Progress Points */}
        <div className="flex justify-between mb-16">
          {[
            { number: "5", label: "Free eBook", active: true },
            { number: "15", label: "Print Edition", active: false },
            { number: "25", label: "Audiobook", active: false },
            { number: "50", label: "Collector Set", active: false }
          ].map((point, i) => (
            <div key={i} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full border-4 
                            flex items-center justify-center
                            shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                            ${point.active 
                              ? 'border-[#8B0000] bg-[#8B0000]' 
                              : 'border-[#8B0000] bg-[#f7f3e9]'}`}>
                <span className={`text-2xl font-bold ${point.active ? 'text-[#f7f3e9]' : 'text-[#8B0000]'}`}>
                  {point.number}
                </span>
              </div>
              <p className="text-sm font-medium text-[#8B0000] whitespace-nowrap">
                {point.label}
              </p>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full w-1/4 bg-[#8B0000] rounded-full" />
        </div>
      </div>
    </div>
  );
} 
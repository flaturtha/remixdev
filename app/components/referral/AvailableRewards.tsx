import React from 'react';

export default function AvailableRewards() {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-[#8B0000] mb-12 tracking-wide">
        AVAILABLE REWARDS
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          "Classic eBook",
          "Print Edition",
          "Audio Version",
          "Collector's Set"
        ].map((product, i) => (
          <div key={i} className="text-center">
            <div className={`aspect-square border-4 ${i === 0 
              ? 'bg-[#8B0000] border-[#8B0000]' 
              : 'bg-[#f7f3e9] border-[#8B0000]'} mb-4
                           flex items-center justify-center
                           shadow-[0_2px_10px_rgba(0,0,0,0.1)]`}>
              <span className={`text-lg font-bold ${i === 0 
                ? 'text-[#f7f3e9]' 
                : 'text-[#8B0000]'}`}>
                {product}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
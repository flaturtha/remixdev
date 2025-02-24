import React from 'react';

export default function TopInvestigators() {
  return (
    <div className="container mx-auto px-4 py-16 bg-[#f7f3e9]">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-[#8B0000] mb-8 tracking-wide text-center">
          TOP INVESTIGATORS
        </h3>
        <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] p-6">
          {[
            { name: "John Doe", points: 1250 },
            { name: "Jane Smith", points: 1100 },
            { name: "Bob Johnson", points: 950 },
            { name: "Alice Brown", points: 800 },
            { name: "Mike Wilson", points: 750 },
            { name: "Sarah Davis", points: 700 },
            { name: "Tom Anderson", points: 650 },
            { name: "Emily White", points: 600 },
            { name: "Chris Martin", points: 550 },
            { name: "Lisa Garcia", points: 500 },
          ].map((player, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between py-3 px-4 rounded-lg mb-2
                        ${index < 3 ? 'bg-[#8B0000]/5' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-[#8B0000] w-6">
                  {index + 1}.
                </span>
                <span className="font-medium">{player.name}</span>
              </div>
              <span className="font-bold text-[#8B0000]">
                {player.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
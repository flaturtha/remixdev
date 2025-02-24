import React from 'react';

export default function WaysToEarnRewards() {
  return (
    <div className="container mx-auto px-4 py-16 bg-[#f7f3e9]">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-[#8B0000] mb-8 tracking-wide text-center">
          WAYS TO EARN REWARDS
        </h3>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Referral Prizes */}
          <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] p-6">
            <h4 className="text-xl font-bold text-[#8B0000] mb-6 text-center">
              Referral Milestones
            </h4>
            <div className="space-y-4">
              {[
                { count: 5, reward: 'Free eBook', description: 'Any classic mystery from our collection' },
                { count: 15, reward: 'Print Edition', description: 'Hardcover edition of your choice' },
                { count: 25, reward: 'Audiobook', description: 'Professional narration of any title' },
                { count: 50, reward: 'Collector Set', description: 'Limited edition box set with exclusive content' }
              ].map((level, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#8B0000]/5">
                  <div className="w-12 h-12 rounded-full border-2 border-[#8B0000] flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[#8B0000]">{level.count}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{level.reward}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Prizes */}
          <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] p-6">
            <h4 className="text-xl font-bold text-[#8B0000] mb-6 text-center">
              Top Investigator Rewards
            </h4>
            <div className="space-y-4">
              {[
                { position: '1st Place', reward: 'Annual Subscription', description: 'Full year of mystery boxes + exclusive content' },
                { position: '2nd Place', reward: 'Quarterly Box Set', description: '3 months of curated mysteries' },
                { position: '3rd Place', reward: 'Deluxe Edition', description: 'Special edition with author notes' },
                { position: 'Top 10', reward: 'Digital Bundle', description: 'Collection of rare digital mysteries' }
              ].map((prize, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#8B0000]/5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                        ${i === 0 ? 'bg-[#FFD700]/20 border-2 border-[#FFD700]' :
                          i === 1 ? 'bg-[#C0C0C0]/20 border-2 border-[#C0C0C0]' :
                          i === 2 ? 'bg-[#CD7F32]/20 border-2 border-[#CD7F32]' :
                          'border-2 border-[#8B0000]'}`}>
                    <span className="font-bold text-[#8B0000]">{i < 3 ? '🏆' : 'TOP'}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{prize.position}</div>
                    <div className="font-medium text-[#8B0000]">{prize.reward}</div>
                    <div className="text-sm text-gray-600">{prize.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
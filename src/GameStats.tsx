// GameStats.tsx
import React from 'react';
import { GameStatsProps } from './types';
import { DICTIONARIES } from './constants';

export const GameStats: React.FC<GameStatsProps> = ({ stats, lang }) => {
  const ui = DICTIONARIES[lang].ui;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
      {[
        { label: ui.played, value: stats.gamesPlayed },
        { label: ui.winRate, value: `${stats.winRate}%` },
        { label: ui.currentStreak, value: stats.currentStreak },
        { label: ui.maxStreak, value: stats.maxStreak }
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold">{item.value}</div>
          <div className="text-xs sm:text-sm text-center">{item.label}</div>
        </div>
      ))}
      
      {/* Distribution Graph */}
      <div className="col-span-2 sm:col-span-4 mt-4">
        <div className="space-y-2">
          {stats.distribution.map((count, index) => {
            const percentage = stats.gamesPlayed > 0 
              ? (count / stats.gamesPlayed) * 100 
              : 0;
            return (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 text-sm">{index + 1}</div>
                <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                  <div 
                    className="bg-green-500 h-5 rounded-full transition-all duration-500 flex items-center justify-end px-2"
                    style={{ width: `${percentage}%` }}
                  >
                    {count > 0 && (
                      <span className="text-xs text-white">{count}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
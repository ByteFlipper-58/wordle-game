// GameStats.tsx
import React from 'react';
import { GameStatsProps } from './types';
import { DICTIONARIES } from './constants';

export const GameStats: React.FC<GameStatsProps> = ({ stats, lang }) => {
  const ui = DICTIONARIES[lang].ui;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      {[
        { label: ui.played, value: stats.gamesPlayed },
        { label: ui.winRate, value: `${stats.winRate}%` },
        { label: ui.currentStreak, value: stats.currentStreak },
        { label: ui.maxStreak, value: stats.maxStreak }
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-xs text-center">{item.label}</div>
        </div>
      ))}
    </div>
  );
};
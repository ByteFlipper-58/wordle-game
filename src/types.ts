export interface Dictionary {
    validWords: string[];
    keyboard: string[][];
    ui: {
      [key: string]: string | string[];
    };
  }
  
  export interface Dictionaries {
    [key: string]: Dictionary;
  }
  
  export interface Stats {
    gamesPlayed: number;
    gamesWon: number;
    currentStreak: number;
    maxStreak: number;
    winRate: number;
    distribution: number[];
  }
  
  export interface GameStatsProps {
    stats: Stats;
    lang: string;
  }
  
  export interface ModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }
  
  export type GameState = "playing" | "won" | "lost";
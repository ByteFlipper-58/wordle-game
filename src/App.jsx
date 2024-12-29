import React, { useState, useEffect } from 'react';
import { Settings, Info, BarChart3, Globe } from 'lucide-react';
import { Alert, AlertDescription } from './Modal';

import { DICTIONARIES, WORD_LENGTH, MAX_ATTEMPTS } from './constants';
import { Modal } from './Modal';
import { GameStats } from './GameStats';
import { getTileStyle, getKeyStyle } from './utils';

const WordleGame = () => {
  // State
  const [language, setLanguage] = useState('ru');
  const [darkMode, setDarkMode] = useState(false);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [message, setMessage] = useState('');
  const [shakeRow, setShakeRow] = useState(-1);
  const [showRules, setShowRules] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
    const [words, setWords] = useState([]); // State to hold word list
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winRate: 0,
    distribution: Array(6).fill(0)
  });

  useEffect(() => {
    loadStats();
    loadSettings();
      loadWords();
  }, [language]);

  const loadStats = () => {
    const savedStats = localStorage.getItem(`wordleStats_${language}`);
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats({
            ...parsedStats,
            distribution: Array.isArray(parsedStats.distribution) ? parsedStats.distribution : Array(6).fill(0)
        });
      } catch (error) {
        console.error("Failed to parse stats from localStorage", error);
        setStats({
          gamesPlayed: 0,
          gamesWon: 0,
          currentStreak: 0,
          maxStreak: 0,
          winRate: 0,
          distribution: Array(6).fill(0)
        });
      }
    }
  };


  const loadSettings = () => {
    const savedDarkMode = localStorage.getItem('wordleDarkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
      document.documentElement.classList.toggle('dark', JSON.parse(savedDarkMode));
    }

    const savedLanguage = localStorage.getItem('wordleLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  };

  const saveSettings = (newDarkMode, newLanguage) => {
    localStorage.setItem('wordleDarkMode', JSON.stringify(newDarkMode));
    localStorage.setItem('wordleLanguage', newLanguage);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const updateStats = (won) => {
    const newStats = { ...stats };
    newStats.gamesPlayed++;
    if (won) {
      newStats.gamesWon++;
      newStats.currentStreak++;
      newStats.maxStreak = Math.max(newStats.currentStreak, newStats.maxStreak);
      if(guesses.length > 0 ) newStats.distribution[guesses.length - 1]++;
    } else {
      newStats.currentStreak = 0;
    }
    newStats.winRate = Math.round((newStats.gamesWon / newStats.gamesPlayed) * 100);
     // Ensure distribution is always carried over
    setStats(newStats);
    localStorage.setItem(`wordleStats_${language}`, JSON.stringify(newStats));
  };
   const loadWords = async () => {
        try {
          const response = await fetch(language === 'en' ? '/src/assets/en_words.txt' : '/src/assets/ru_words.txt');
          const text = await response.text();
          const wordsArray = text.trim().split('\n').map(word => word.trim());
            setWords(wordsArray);
        } catch (error) {
            console.error("Failed to load words", error);
            setWords([]);
        }
    };


  const startNewGame = () => {
      const newWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(newWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameState('playing');
    setMessage('');
    setShakeRow(-1);
  };

  const handleGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage(DICTIONARIES[language].ui.invalidLength);
      setShakeRow(guesses.length);
      return;
    }

    if (!words.includes(currentGuess)) {
      setMessage(DICTIONARIES[language].ui.invalidWord);
      setShakeRow(guesses.length);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');
    setMessage('');
    setShakeRow(-1);

    if (currentGuess === targetWord) {
      setGameState('won');
      setMessage(DICTIONARIES[language].ui.win);
      updateStats(true);
      setShowStats(true);
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameState('lost');
      setMessage(DICTIONARIES[language].ui.lose);
      updateStats(false);
      setShowStats(true);
    }
  };

  const handleKeyPress = (key) => {
    if (gameState !== 'playing') return;

    const enterKey = language === 'en' ? 'ENTER' : 'ВВОД';

    if (key === enterKey) {
      handleGuess();
    } else if (key === '←') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <button
          onClick={() => setShowRules(true)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
        >
          <Info size={24} />
        </button>
        <h1 className="text-4xl font-bold">
          {DICTIONARIES[language].ui.title}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStats(true)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
          >
            <BarChart3 size={24} />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid gap-2 mb-4">
        {Array(MAX_ATTEMPTS).fill(null).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex gap-2 ${shakeRow === rowIndex ? 'animate-shake' : ''}`}
          >
            {Array(WORD_LENGTH).fill(null).map((_, colIndex) => {
              const letter = rowIndex < guesses.length
                ? guesses[rowIndex][colIndex]
                : rowIndex === guesses.length && colIndex < currentGuess.length
                  ? currentGuess[colIndex]
                  : '';

              return (
                <div
                  key={colIndex}
                  className={getTileStyle(
                    letter,
                    rowIndex,
                    colIndex,
                    rowIndex < guesses.length,
                    guesses,
                    targetWord
                  )}
                  style={{
                    animationDelay: `${colIndex * 100}ms`,
                    perspective: '1000px'
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Message */}
      {message && (
        <Alert className="mb-4 w-full max-w-md animate-slideIn">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {/* Keyboard */}
      <div className="w-full max-w-md space-y-2">
        {DICTIONARIES[language].keyboard.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={getKeyStyle(key, language, guesses, targetWord)}
                disabled={gameState !== 'playing'}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Modals */}
      <Modal
        show={showRules}
        onClose={() => setShowRules(false)}
        title={DICTIONARIES[language].ui.rules}
      >
        <div className="space-y-4">
          {(DICTIONARIES[language].ui.rulesText).map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </Modal>

      <Modal
        show={showStats}
        onClose={() => setShowStats(false)}
        title={DICTIONARIES[language].ui.statistics}
      >
        <GameStats stats={stats} lang={language} />
      </Modal>

      <Modal
        show={showSettings}
        onClose={() => setShowSettings(false)}
        title={DICTIONARIES[language].ui.settings}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{DICTIONARIES[language].ui.darkMode}</span>
            <button
              onClick={() => {
                const newMode = !darkMode;
                setDarkMode(newMode);
                saveSettings(newMode, language);
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                darkMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${
                darkMode ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>{DICTIONARIES[language].ui.language}</span>
            <button
              onClick={() => {
                const newLang = language === 'en' ? 'ru' : 'en';
                setLanguage(newLang);
                saveSettings(darkMode, newLang);
              }}
              className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes flip {
          0% { transform: rotateX(0); }
          50% { transform: rotateX(90deg); }
          100% { transform: rotateX(0); }
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-pop { animation: pop 0.15s ease-in-out; }
        .animate-flip { animation: flip 0.5s ease-in-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default WordleGame;
import { WORD_LENGTH } from './constants';

export const computeHints = (guess: string, targetWord: string): string[] => {
  const hints = Array(WORD_LENGTH).fill('absent');
  const targetLetterCount: { [key: string]: number } = {};
  
  // Count letters in target word
  for (let letter of targetWord) {
    targetLetterCount[letter] = (targetLetterCount[letter] || 0) + 1;
  }
  
  // Find correct letters first
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === targetWord[i]) {
      hints[i] = 'correct';
      targetLetterCount[guess[i]]--;
    }
  }
  
  // Then find present letters
  for (let i = 0; i < guess.length; i++) {
    if (hints[i] !== 'correct' && targetLetterCount[guess[i]] > 0) {
      hints[i] = 'present';
      targetLetterCount[guess[i]]--;
    }
  }
  
  return hints;
};

export const getTileStyle = (
  letter: string,
  rowIndex: number,
  colIndex: number,
  isRevealed: boolean,
  guesses: string[],
  targetWord: string
): string => {
  const baseStyle = `
    w-14 h-14 flex items-center justify-center text-2xl font-bold rounded
    shadow-lg transform transition-all duration-300
  `;

  if (!letter) {
    return `${baseStyle} bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600`;
  }

  if (!isRevealed) {
    return `${baseStyle} bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 scale-100 animate-pop`;
  }

  const hints = computeHints(guesses[rowIndex], targetWord);
  switch (hints[colIndex]) {
    case 'correct':
      return `${baseStyle} bg-green-500 dark:bg-green-600 text-white border-2 border-green-600 dark:border-green-700 scale-100 animate-flip`;
    case 'present':
      return `${baseStyle} bg-yellow-500 dark:bg-yellow-600 text-white border-2 border-yellow-600 dark:border-yellow-700 scale-100 animate-flip`;
    case 'absent':
      return `${baseStyle} bg-gray-500 dark:bg-gray-600 text-white border-2 border-gray-600 dark:border-gray-700 scale-100 animate-flip`;
    default:
      return baseStyle;
  }
};

export const getKeyStyle = (
  key: string,
  language: string,
  guesses: string[],
  targetWord: string
): string => {
  const baseStyle = `
    h-14 min-w-[40px] flex-grow flex items-center justify-center 
    font-bold text-sm sm:text-base rounded mx-0.5 
    transform transition-all duration-150 
    shadow-lg hover:scale-105 active:scale-95
    cursor-pointer select-none
  `;

  const enterKey = language === 'en' ? 'ENTER' : 'ВВОД';
  if (key === enterKey || key === '←') {
    return `${baseStyle} bg-gray-700 dark:bg-gray-600 text-white hover:bg-gray-600 dark:hover:bg-gray-500`;
  }

  let status = 'unused';
  for (const guess of guesses) {
    const hints = computeHints(guess, targetWord);
    const index = guess.indexOf(key);
    if (index !== -1) {
      const currentStatus = hints[index];
      if (currentStatus === 'correct') {
        status = 'correct';
        break;
      }
      if (currentStatus === 'present' && status !== 'correct') {
        status = 'present';
      }
      if (currentStatus === 'absent' && status === 'unused') {
        status = 'absent';
      }
    }
  }

  switch (status) {
    case 'correct':
      return `${baseStyle} bg-green-500 dark:bg-green-600 text-white hover:bg-green-400 dark:hover:bg-green-500`;
    case 'present':
      return `${baseStyle} bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-400 dark:hover:bg-yellow-500`;
    case 'absent':
      return `${baseStyle} bg-gray-500 dark:bg-gray-600 text-white hover:bg-gray-400 dark:hover:bg-gray-500`;
    default:
      return `${baseStyle} bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600`;
  }
};
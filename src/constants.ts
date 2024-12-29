export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

export const DICTIONARIES = {
  ru: {
    validWords: ['КНИГА', 'СЛОВО', 'ВРЕМЯ', 'ЖИЗНЬ', 'МЕСТО', 'АВТОР', 'ПОЕЗД', 'РУЧКА', 'ГЛАЗА'],
    keyboard: [
      ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
      ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
      ['ВВОД', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '←']
    ],
    ui: {
      title: 'WORDLE',
      newGame: 'Новая игра',
      settings: 'Настройки',
      rules: 'Правила',
      statistics: 'Статистика',
      win: 'Поздравляем!',
      lose: 'Попробуйте ещё раз!',
      invalidWord: 'Слово не найдено',
      invalidLength: 'Слово должно быть из 5 букв',
      darkMode: 'Тёмная тема',
      language: 'Язык',
      played: 'Игр сыграно',
      winRate: 'Процент побед',
      currentStreak: 'Текущая серия',
      maxStreak: 'Макс. серия',
      nextWord: 'Следующее слово через',
      share: 'Поделиться',
      rulesText: [
        'Угадайте слово из 5 букв за 6 попыток.',
        'После каждой попытки цвет букв изменится:',
        'Зелёный - буква на правильном месте',
        'Жёлтый - буква есть в слове, но не на своем месте',
        'Серый - такой буквы в слове нет'
      ]
    }
  },
  en: {
    validWords: ['WORLD', 'BEACH', 'CLOCK', 'DREAM', 'EARTH', 'FLAME', 'GHOST', 'HEART', 'LIGHT', 'MUSIC'],
    keyboard: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←']
    ],
    ui: {
      title: 'WORDLE',
      newGame: 'New Game',
      settings: 'Settings',
      rules: 'Rules',
      statistics: 'Statistics',
      win: 'Congratulations!',
      lose: 'Try again!',
      invalidWord: 'Word not found',
      invalidLength: 'Word must be 5 letters',
      darkMode: 'Dark Mode',
      language: 'Language',
      played: 'Played',
      winRate: 'Win Rate',
      currentStreak: 'Current Streak',
      maxStreak: 'Max Streak',
      nextWord: 'Next word in',
      share: 'Share',
      rulesText: [
        'Guess the word in 6 tries.',
        'After each guess, the color of the tiles will change:',
        'Green - letter is in the correct spot',
        'Yellow - letter is in the word but in the wrong spot',
        'Gray - letter is not in the word'
      ]
    }
  }
} as const;
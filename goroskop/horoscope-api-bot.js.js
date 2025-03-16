const TelegramBot = require('node-telegram-bot-api');

const token = '7634168578:AAG14evIqlzey19GVOZay4L44VYOqeRDTWg';
const bot = new TelegramBot(token, { polling: true });

const zodiacEmojis = {
  aries: '♈ Овен',
  taurus: '♉ Телец',
  gemini: '♊ Близнецы',
  cancer: '♋ Рак',
  leo: '♌ Лев',
  virgo: '♍ Дева',
  libra: '♎ Весы',
  scorpio: '♏ Скорпион',
  sagittarius: '♐ Стрелец',
  capricorn: '♑ Козерог',
  aquarius: '♒ Водолей',
  pisces: '♓ Рыбы',
};

const horoscopes = {
  aries: 'Сегодня день полон энергии! Берись за новые дела и не бойся рисковать. ✨',
  taurus: 'Терпение приведёт к успеху. Наслаждайся спокойствием и уютом. 🌿',
  gemini: 'Твоя общительность откроет новые двери. Будь на волне! 💬',
  cancer: 'Слушай своё сердце — оно подскажет верный путь. 🌙',
  leo: 'Ты сияешь ярче всех! Покажи миру свою силу. 🦁',
  virgo: 'Внимание к мелочам принесёт большую победу. Продолжай! ⚖️',
  libra: 'Гармония — твой спутник. Делай выбор с уверенностью. 🌸',
  scorpio: 'Тайны раскроются, а страсть приведёт к цели. 🔥',
  sagittarius: 'Приключения зовут! Не сиди на месте, исследуй мир. 🏹',
  capricorn: 'Твой труд окупится. Шагай к вершине! ⛰️',
  aquarius: 'Искры гениальности осветят твой день. Делись идеями! 💡',
  pisces: 'Мечты сбываются, если поверить в чудеса. 🌊',
};

// Временное решение: убираем анимации
bot.onText(/\/gethoroscope/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '✨ Выбери свой знак зодиака для гороскопа на сегодня:', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: zodiacEmojis.aries, callback_data: 'aries' },
          { text: zodiacEmojis.taurus, callback_data: 'taurus' },
          { text: zodiacEmojis.gemini, callback_data: 'gemini' },
        ],
        [
          { text: zodiacEmojis.cancer, callback_data: 'cancer' },
          { text: zodiacEmojis.leo, callback_data: 'leo' },
          { text: zodiacEmojis.virgo, callback_data: 'virgo' },
        ],
        [
          { text: zodiacEmojis.libra, callback_data: 'libra' },
          { text: zodiacEmojis.scorpio, callback_data: 'scorpio' },
          { text: zodiacEmojis.sagittarius, callback_data: 'sagittarius' },
        ],
        [
          { text: zodiacEmojis.capricorn, callback_data: 'capricorn' },
          { text: zodiacEmojis.aquarius, callback_data: 'aquarius' },
          { text: zodiacEmojis.pisces, callback_data: 'pisces' },
        ],
      ],
    },
  });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const sign = query.data;

  const message = `*${zodiacEmojis[sign]} — Гороскоп на сегодня:*\n` +
                 `🌟 *Предсказание:* ${horoscopes[sign]}`;

  // Временно отправляем только текст
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

console.log('Бот-гороскоп запущен!');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '7650426817:AAEQp3wDL4KAD8PR73biq1YoZtVvo3Rb0TI';
const apiKey = '487dd68264659faf39dd823fff0fc4cf'; // Убедись, что здесь твой рабочий ключ

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Напиши название любого города в мире, и я скажу погоду.');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const city = msg.text;

  if (city === '/start') return;

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
  console.log(`Запрос: ${url}`);

  axios
    .get(url)
    .then((response) => {
      const weather = response.data;
      const message = `Погода в ${weather.name}:\n` +
                      `Температура: ${weather.main.temp}°C\n` +
                      `Ощущается как: ${weather.main.feels_like}°C\n` +
                      `Описание: ${weather.weather[0].description}`;
      bot.sendMessage(chatId, message);
    })
    .catch((error) => {
      console.log('Ошибка:', error.response ? error.response.data : error.message);
      bot.sendMessage(chatId, 'Не нашел такой город. Попробуй ещё раз!');
    });
});

console.log('Бот запущен!');
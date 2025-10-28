require('dotenv').config();
const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;
const CHANNEL_ID = process.env.CHANNEL_ID;

if (!BOT_TOKEN || !WEB_APP_URL || !CHANNEL_ID) {
  console.error('Missing BOT_TOKEN or WEB_APP_URL or CHANNEL_ID in .env');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

(async () => {
  try {
    await bot.telegram.sendMessage(
      CHANNEL_ID,
      'waitingstarman — мини‑приложение',
      {
        reply_markup: {
          inline_keyboard: [[{ text: 'Открыть', web_app: { url: WEB_APP_URL } }]],
        },
      }
    );
    console.log('Posted to channel successfully');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();


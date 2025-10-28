require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { Telegraf, Markup } = require('telegraf');

const PORT = process.env.PORT || 3000;
const WEB_APP_URL = process.env.WEB_APP_URL || `http://localhost:${PORT}`;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID; // @username или -100...

if (!BOT_TOKEN) {
  console.warn('[warn] BOT_TOKEN не найден. Добавьте переменную окружения в .env');
}

// Express server to host the mini app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Lightweight config endpoint if needed later
app.get('/health', (_req, res) => res.json({ ok: true }));

const server = app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});

// Telegram bot (long polling)
let bot;
if (BOT_TOKEN) {
  bot = new Telegraf(BOT_TOKEN);

  bot.start((ctx) =>
    ctx.reply(
      'Привет! Это мини-приложение waitingstarman.',
      Markup.inlineKeyboard([[Markup.button.webApp('Открыть мини-приложение', WEB_APP_URL)]])
    )
  );

  bot.command('app', (ctx) =>
    ctx.reply('Открыть мини-приложение', Markup.inlineKeyboard([[Markup.button.webApp('Перейти', WEB_APP_URL)]]))
  );

  bot.command('post_channel', async (ctx) => {
    if (!CHANNEL_ID) {
      return ctx.reply('CHANNEL_ID не указан в .env');
    }

    try {
      await ctx.telegram.sendMessage(CHANNEL_ID, 'waitingstarman приглашает в мини-приложение', {
        reply_markup: {
          inline_keyboard: [[{ text: 'Перейти', web_app: { url: WEB_APP_URL } }]],
        },
      });

      return ctx.reply('Сообщение успешно отправлено в канал.');
    } catch (error) {
      console.error('[bot] не удалось отправить сообщение в канал', error);
      return ctx.reply('Ошибка отправки. Проверьте доступ бота к каналу.');
    }
  });

  bot.launch().then(() => console.log('[bot] started'));

  // graceful stop
  process.once('SIGINT', () => {
    server.close();
    bot.stop('SIGINT');
  });
  process.once('SIGTERM', () => {
    server.close();
    bot.stop('SIGTERM');
  });
}

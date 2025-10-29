require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { Telegraf, Markup } = require('telegraf');

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || process.env.WEB_APP_URL;
const CHANNEL_ID = process.env.CHANNEL_ID;

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

const staticDir = path.join(__dirname, 'web');
app.use(express.static(staticDir));

const sendHtml = (file) => (_req, res) => res.sendFile(path.join(staticDir, file));

app.get('/', sendHtml('index.html'));
app.get('/links', sendHtml('links.html'));
app.get('/contact', sendHtml('contact.html'));
app.get('/health', (_req, res) => res.json({ ok: true }));

let bot;
if (!BOT_TOKEN) {
  console.warn('[warn] BOT_TOKEN не найден. Добавьте переменную окружения в .env');
} else {
  bot = new Telegraf(BOT_TOKEN);

  const ensureWebApp = (ctx) => {
    if (WEBAPP_URL) return true;
    ctx.reply('Мини-приложение временно недоступно. Попробуйте позже.');
    return false;
  };

  bot.start((ctx) => {
    if (!ensureWebApp(ctx)) return;
    ctx.reply(
      'Привет! Это мини-приложение waitingstarman.',
      Markup.inlineKeyboard([[Markup.button.webApp('Открыть мини-приложение', WEBAPP_URL)]])
    );
  });

  bot.command('app', (ctx) => {
    if (!ensureWebApp(ctx)) return;
    ctx.reply(
      'Открыть мини-приложение',
      Markup.inlineKeyboard([[Markup.button.webApp('Перейти', WEBAPP_URL)]])
    );
  });

  bot.command('post_channel', async (ctx) => {
    if (!CHANNEL_ID) {
      return ctx.reply('CHANNEL_ID не указан в .env');
    }
    if (!ensureWebApp(ctx)) return;

    try {
      await ctx.telegram.sendMessage(CHANNEL_ID, 'waitingstarman приглашает в мини-приложение', {
        reply_markup: {
          inline_keyboard: [[{ text: 'Перейти', web_app: { url: WEBAPP_URL } }]],
        },
      });

      ctx.reply('Сообщение успешно отправлено в канал.');
    } catch (error) {
      console.error('[bot] не удалось отправить сообщение в канал', error);
      ctx.reply('Ошибка отправки. Проверьте доступ бота к каналу.');
    }
  });

  const webhookCallback = bot.webhookCallback('/api/telegram');
  app.post('/api/telegram', (req, res, next) => {
    webhookCallback(req, res).catch(next);
  });
}

if (!bot) {
  app.post('/api/telegram', (_req, res) => {
    res.status(503).json({ ok: false, error: 'BOT_TOKEN missing' });
  });
}

app.use((err, _req, res, _next) => {
  console.error('[server] unhandled error', err);
  res.status(500).json({ ok: false });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});

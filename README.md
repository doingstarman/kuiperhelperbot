waitingstarman Telegram Mini App Bot

Что внутри
- Node.js + Express для статики мини‑приложения
- Telegraf для бота и inline‑кнопки c `web_app`
- Простое SPA без сборки: HTML/CSS/JS в `public/`

Быстрый старт (локально)
1) Создать `.env` рядом с `package.json`:
   - `BOT_TOKEN=...`
   - `WEB_APP_URL=http://localhost:3000` (для продакшена заменить на HTTPS)
   - опционально `CHANNEL_ID=@your_channel` или `-100...`
2) Установить зависимости: `npm i`
3) Запуск: `npm run dev`

Деплой
- Мини‑приложение должно быть доступно по HTTPS. Разместите `public/` на Vercel/Netlify/GitHub Pages и пропишите URL в `WEB_APP_URL`.
- Бот может работать по long polling на любом VPS/хостинге (Render/Railway/Fly.io и т.д.).

Публикация в канал
- Дайте боту права администратора канала.
- Установите `CHANNEL_ID` и выполните `npm run post:channel` для публикации кнопки открытия Mini App.

Ссылки редактируются в `public/config.js`.


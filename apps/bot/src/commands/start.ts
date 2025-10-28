import type { Telegraf } from 'telegraf';
import type { Context } from 'telegraf';

const WEBAPP_URL = process.env.WEBAPP_URL;

const START_MESSAGE = `🚀 *Kuiper Helper Bot*

Tap the WebApp below to explore quick actions, curated resources, and a smooth onboarding flow tailored for Telegram. Let us know how we can accelerate your mission!`;

export function registerStartCommand(bot: Telegraf<Context>) {
  bot.start(async (ctx) => {
    if (!WEBAPP_URL) {
      await ctx.reply('WEBAPP_URL is not configured. Please contact the administrator.');
      return;
    }

    await ctx.replyWithMarkdownV2(START_MESSAGE, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Open Kuiper WebApp',
              web_app: {
                url: WEBAPP_URL,
              },
            },
          ],
        ],
      },
    });
  });
}

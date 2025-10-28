import { Telegraf } from 'telegraf';
import type { Context, MiddlewareFn } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import { registerStartCommand } from './commands/start.js';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}

export type BotContext = Context;

export const bot = new Telegraf<BotContext>(BOT_TOKEN, {
  telegram: {
    webhookReply: false,
  },
});

registerStartCommand(bot);

bot.catch((error, ctx) => {
  console.error('Bot error', {
    updateId: ctx.update?.update_id,
    error,
  });
});

export const createWebhookCallback = () => bot.webhookCallback('/api/telegram');

export async function handleUpdate(update: Update) {
  await bot.handleUpdate(update);
}

export type WebhookMiddleware = MiddlewareFn<BotContext>;

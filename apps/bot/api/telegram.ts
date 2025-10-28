import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Update } from 'telegraf/typings/core/types/typegram';
import { handleUpdate } from '../src/index.js';

const SECRET_TOKEN = process.env.TELEGRAM_SECRET_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(200).json({ ok: true });
    return;
  }

  if (!SECRET_TOKEN) {
    res.status(500).json({ ok: false, error: 'TELEGRAM_SECRET_TOKEN is not configured' });
    return;
  }

  const headerToken = Array.isArray(req.headers['x-telegram-bot-api-secret-token'])
    ? req.headers['x-telegram-bot-api-secret-token'][0]
    : req.headers['x-telegram-bot-api-secret-token'];

  if (headerToken !== SECRET_TOKEN) {
    res.status(401).json({ ok: false, error: 'Unauthorized' });
    return;
  }

  try {
    const update = req.body as Update;
    await handleUpdate(update);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to process update', error);
    res.status(500).json({ ok: false });
  }
}

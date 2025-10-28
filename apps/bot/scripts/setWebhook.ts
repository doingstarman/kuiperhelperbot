const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_SECRET_TOKEN;
const webAppUrl = process.env.WEBAPP_URL;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is required');
}

if (!secret) {
  throw new Error('TELEGRAM_SECRET_TOKEN is required');
}

if (!webAppUrl) {
  throw new Error('WEBAPP_URL is required to infer the webhook endpoint');
}

const webhookUrl = new URL('/api/telegram', webAppUrl).toString();

async function setWebhook() {
  const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: webhookUrl,
      secret_token: secret,
      drop_pending_updates: true,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    console.error('Failed to set webhook', data);
    process.exit(1);
  }

  console.log('Webhook configured for %s', webhookUrl);
}

setWebhook().catch((error) => {
  console.error('Unexpected error while setting webhook', error);
  process.exit(1);
});

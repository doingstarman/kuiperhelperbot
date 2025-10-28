const fallbackWebAppUrl = 'https://example.com';

export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL ?? process.env.WEBAPP_URL ?? fallbackWebAppUrl;
export const TELEGRAM_USERNAME =
  process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? 'kuiperhelperbot';
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@example.com';
export const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+1 (555) 010-1234';

# Kuiper Helper Bot Monorepo

This repository contains the Telegram bot webhook and the accompanying Next.js web application deployed on Vercel. It uses pnpm workspaces to share tooling and configuration between the projects.

## Packages

- **apps/web** – Next.js 14 web application with Tailwind CSS, Framer Motion, and Telegram WebApp enhancements.
- **apps/bot** – Telegraf webhook handler packaged for Vercel serverless functions with a webhook setup script.

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment example file and fill in your credentials:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Description |
   | --- | --- |
   | `TELEGRAM_BOT_TOKEN` | Bot token provided by @BotFather. |
   | `TELEGRAM_SECRET_TOKEN` | Secret used to validate incoming webhook requests. |
   | `WEBAPP_URL` | Base URL for the deployed Vercel project (used for webhook inference). |
   | `NEXT_PUBLIC_WEBAPP_URL` | Public URL to the WebApp used in the Next.js UI. |
   | `NEXT_PUBLIC_TELEGRAM_USERNAME` | Username displayed across the web experience. |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email surfaced on the contact page. |
   | `NEXT_PUBLIC_CONTACT_PHONE` | Contact phone number surfaced on the contact page. |

3. Start the development servers:

   ```bash
   pnpm dev:web
   pnpm dev:bot
   ```

## Useful Scripts

- `pnpm build:web` – Build the Next.js application.
- `pnpm build:bot` – Build the Telegraf bot.
- `pnpm set-webhook` – Call the Telegram API to set the webhook URL and secret.
- `pnpm deploy` – Trigger a Vercel production deployment using the Vercel CLI.

## Tooling

The repository ships with ESLint, Prettier, Husky, and lint-staged. Husky installs a pre-commit hook to lint and format staged files automatically.

## Deployment Notes

Vercel is configured through `vercel.json` to build the Next.js app and expose the Telegram webhook via the `/api/telegram` route.

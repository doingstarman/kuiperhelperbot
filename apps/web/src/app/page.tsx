'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NeumorphicButton } from '@/components/NeumorphicButton';
import { WEBAPP_URL, TELEGRAM_USERNAME } from '@/config/constants';
import { useTelegramWebApp } from '@/lib/useTelegramWebApp';

export default function HomePage() {
  const { webApp } = useTelegramWebApp();

  const handleLaunch = () => {
    if (webApp) {
      webApp.expand();
    }
    if (typeof window !== 'undefined') {
      window.open(WEBAPP_URL, '_blank', 'noreferrer');
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12">
      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            A frictionless companion for Telegram communities
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
          >
            Kuiper Helper Bot pairs a modern web experience with powerful chat automation. Launch the
            Telegram WebApp to discover quick actions, curated resources, and a responsive UI that
            mirrors your preferred theme.
          </motion.p>
          <div className="flex flex-wrap items-center gap-4">
            <NeumorphicButton onClick={handleLaunch} className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white shadow-xl">
              Open WebApp
            </NeumorphicButton>
            <Link
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              className="text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            >
              @{TELEGRAM_USERNAME}
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 via-white to-slate-100 shadow-2xl dark:from-slate-800 dark:via-slate-900 dark:to-slate-950"
        >
          <div className="absolute inset-6 rounded-3xl border border-white/30 dark:border-slate-700/60" />
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Telegram</p>
            <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">WebApp ready</p>
            <p className="mx-auto max-w-xs text-sm text-slate-500 dark:text-slate-400">
              Adaptive theme, gestures, and deep links keep your users engaged inside the chat.
            </p>
          </div>
        </motion.div>
      </section>
      <section className="grid gap-8 md:grid-cols-3">
        {[
          {
            title: 'Responsive by default',
            description:
              'Optimized layouts for phones, tablets, and desktops guarantee a delightful experience wherever Telegram runs.',
          },
          {
            title: 'Micro-interactions',
            description:
              'Framer Motion-driven transitions and neumorphic buttons add subtle feedback without overwhelming users.',
          },
          {
            title: 'Secure webhooks',
            description:
              'Hardened webhook checks and secret tokens keep Telegram updates flowing only from trusted sources.',
          },
        ].map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white/70 p-6 shadow-lg ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-700/60"
          >
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

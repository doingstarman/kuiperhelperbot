'use client';

import { motion } from 'framer-motion';
import { NeumorphicButton } from '@/components/NeumorphicButton';
import { WEBAPP_URL, TELEGRAM_USERNAME } from '@/config/constants';

const resources = [
  {
    title: 'Launch the WebApp',
    description: 'Open the Telegram-embedded experience to access quick commands and curated dashboards.',
    href: WEBAPP_URL,
  },
  {
    title: 'Join the Telegram channel',
    description: 'Stay ahead with deployment notices, release highlights, and automation tricks.',
    href: `https://t.me/${TELEGRAM_USERNAME}`,
  },
  {
    title: 'Read the documentation',
    description: 'Learn how the bot, webhook, and web interface work together in this monorepo.',
    href: 'https://github.com/your-org/kuiperhelperbot',
  },
];

export default function LinksPage() {
  const openLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noreferrer');
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Quick Links</h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Save time by jumping straight to our most popular destinations. Each button animates with a
          soft hover effect so you always know where you are headed.
        </p>
      </header>
      <div className="grid gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-3xl bg-white/70 p-6 shadow-lg ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-700/60"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{resource.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{resource.description}</p>
              </div>
              <NeumorphicButton className="sm:shrink-0" onClick={() => openLink(resource.href)}>
                Visit
              </NeumorphicButton>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
